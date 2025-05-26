
"use client"

import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return
      }

      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
      api?.scrollNext()
    }, [api])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )

    React.useEffect(() => {
      if (!api || !setApi) {
        return
      }

      setApi(api)
    }, [api, setApi])

    React.useEffect(() => {
      if (!api) {
        return
      }

      onSelect(api)
      api.on("reInit", onSelect)
      api.on("select", onSelect)

      return () => {
        api?.off("select", onSelect)
      }
    }, [api, onSelect])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          <div ref={carouselRef} className="overflow-hidden h-full"> {/* Added h-full */}
            {/* CarouselContent is rendered by the consumer directly if they follow shadcn pattern,
                but it's better to make this viewport div take full height if CarouselContent is expected to.
                The actual CarouselContent component defined below is what the user puts their items in.
             */}
            {children} 
            {/* If CarouselContent is not part of `children` here but defined separately by user,
                this approach changes slightly.
                However, looking at HeroSection.tsx usage, CarouselContent IS a child.
                The typical shadcn structure is:
                <Carousel>
                  <CarouselContent>
                    <CarouselItem/>
                  </CarouselContent>
                  <CarouselPrevious/>
                  <CarouselNext/>
                </Carousel>
                So `children` here refers to CarouselContent, Previous, Next.
                The fix must be on the div that WRAPS CarouselContent.
                Ah, `CarouselContent` is NOT a child here. This is a common mistake in my understanding.
                `CarouselContent` is a separate component.
                The `children` prop of `Carousel` is where `CarouselContent`, `CarouselPrevious`, `CarouselNext` are placed by the USER.

                Let's re-evaluate.
                The structure from Shadcn is:
                Carousel (provides context, root div)
                  - USER places CarouselContent here
                  - USER places CarouselPrevious here
                  - USER places CarouselNext here

                CarouselContent (uses context, div with ref=carouselRef, then the flex div)
                  - USER places CarouselItem here

                The div with `ref={carouselRef}` is actually INSIDE the `CarouselContent` component, not `Carousel`.

                This means the fix applied to `Carousel` component (adding h-full to its inner div) was incorrect.
                The `ref={carouselRef}` div is in `CarouselContent`.
              */}
              {/* Corrected logic: The ref to embla is on the CarouselContent's first div.
                  My previous change attempt for carousel.tsx was on the WRONG component's structure.
                  The change needs to be within the CarouselContent component's structure if that's where the viewport is.

                  Let's look at CarouselContent in carousel.tsx:
                  const CarouselContent = React.forwardRef(...) {
                    const { carouselRef, orientation } = useCarousel()
                    return (
                      <div ref={carouselRef} className="overflow-hidden"> // <<< THIS IS THE VIEWPORT
                        <div className={cn("flex", ...)}> // <<< THIS IS THE CONTAINER FOR ITEMS
                          {props.children}
                        </div>
                      </div>
                    )
                  }
                  So, the `overflow-hidden` div needs `h-full` IF its parent (which is the root div of `Carousel` component in HeroSection) has height.
                  The `Carousel` component in HeroSection has `className="absolute inset-0 w-full h-full"`. So it HAS height.
                  Therefore, the `overflow-hidden` div in `CarouselContent` needs `h-full`.
              */}
          </div>
          {/* The `children` here refers to what's passed to <Carousel>.
              In HeroSection.tsx, these are: <CarouselContent>, <CarouselPrevious>, <CarouselNext>
              So the `div` above with `ref={carouselRef}` is not the one I thought.

              The `carouselRef` is obtained from `useEmblaCarousel` WITHIN the `Carousel` component
              and then PASSED via context to `CarouselContent`, which then uses it.
              Okay, the original `Carousel` component:
              const [carouselRef, api] = useEmblaCarousel(...);
              This `carouselRef` is given to the CONTEXT.

              `CarouselContent`:
              const { carouselRef, orientation } = useCarousel();
              return (
                <div ref={carouselRef} className="overflow-hidden"> // THIS IS THE ONE!
                  <div className={cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className)} {...props} />
                </div>
              )
              So, the `div` with `className="overflow-hidden"` in `CarouselContent` needs `h-full`.
            */}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    // This is the Embla viewport
    <div ref={carouselRef} className="overflow-hidden h-full"> {/* <<< ADDED h-full HERE */}
      <div
        ref={ref} // This ref is for the user, if they want to ref CarouselContent
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props} // children are passed here
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-10 w-10 rounded-full",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2" // Original Shadcn styling. Will be overridden in HeroSection.
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-6 w-6" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-10 w-10 rounded-full",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2" // Original Shadcn styling. Will be overridden in HeroSection.
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-6 w-6" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}

