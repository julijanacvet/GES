
'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TrendingUp, AlertCircle, Info } from 'lucide-react';
import Link from 'next/link';

// Dummy data (as per user request, user will update with actual Macedonian data)
const AVG_ELECTRICITY_COST_MKD_KWH = 0.12; // User: 0.12 MKD/kWh
const AVG_PEAK_SUN_HOURS_DAY = 4.5;      // User: 4.5 hours/day
const PANEL_EFFICIENCY_KW_SQM = 0.18;    // User: 0.18 kW/sq. meter
const SYSTEM_COST_PER_KW_MKD = 800;      // User: 800 MKD/kW (very low, as per prompt)
const CO2_REDUCTION_FACTOR_KG_KWH = 0.5; // User: 0.5 kg CO2/kWh

interface CalculationResults {
  systemSizeKw: number;
  systemCostMkd: number;
  annualSavingsMkd: number;
  paybackPeriodYears: number;
  annualCo2ReductionKg: number;
}

export default function SolarCalculator() {
  const { t, i18n } = useTranslation('common');
  const locale = i18n.language;

  const [monthlyBill, setMonthlyBill] = useState('');
  const [roofSize, setRoofSize] = useState('');
  const [energyOffset, setEnergyOffset] = useState('80'); // Default to 80%
  const [buildingType, setBuildingType] = useState('residential');
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Client-side check to prevent hydration errors for initial render of Select
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);


  const handleCalculate = () => {
    setError(null);
    setResults(null);

    const bill = parseFloat(monthlyBill);
    const roof = parseFloat(roofSize);
    const offset = parseFloat(energyOffset);

    if (isNaN(bill) || bill <= 0 || isNaN(roof) || roof <= 0 || isNaN(offset) || offset <= 0 || offset > 100) {
      setError(t('calculator.errorInput'));
      return;
    }

    // Calculations
    const monthlyKwhConsumption = bill / AVG_ELECTRICITY_COST_MKD_KWH;
    const dailyKwhConsumption = monthlyKwhConsumption / 30;
    const dailyEnergyNeededForOffset = dailyKwhConsumption * (offset / 100);
    
    let systemSizeKw = dailyEnergyNeededForOffset / AVG_PEAK_SUN_HOURS_DAY;
    
    const maxSystemSizeBasedOnRoofKw = roof * PANEL_EFFICIENCY_KW_SQM;
    systemSizeKw = Math.min(systemSizeKw, maxSystemSizeBasedOnRoofKw); // Cannot exceed roof capacity

    if (systemSizeKw <=0) {
        setError("Calculated system size is too small or negative. Please check inputs or assumptions.");
        return;
    }

    const systemCostMkd = systemSizeKw * SYSTEM_COST_PER_KW_MKD;
    const annualEnergyProductionKwh = systemSizeKw * AVG_PEAK_SUN_HOURS_DAY * 365;
    const annualSavingsMkd = annualEnergyProductionKwh * AVG_ELECTRICITY_COST_MKD_KWH;
    const paybackPeriodYears = annualSavingsMkd > 0 ? systemCostMkd / annualSavingsMkd : Infinity;
    const annualCo2ReductionKg = annualEnergyProductionKwh * CO2_REDUCTION_FACTOR_KG_KWH;

    setResults({
      systemSizeKw: parseFloat(systemSizeKw.toFixed(2)),
      systemCostMkd: parseFloat(systemCostMkd.toFixed(2)),
      annualSavingsMkd: parseFloat(annualSavingsMkd.toFixed(2)),
      paybackPeriodYears: parseFloat(paybackPeriodYears.toFixed(1)),
      annualCo2ReductionKg: parseFloat(annualCo2ReductionKg.toFixed(2)),
    });
  };

  if (!hasMounted) {
    // Or a loading skeleton for the Select component
    return null; 
  }

  return (
    <section id="calculator" className="bg-background">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-xl rounded-xl overflow-hidden">
          <CardHeader className="bg-primary/10">
            <CardTitle className="text-2xl md:text-3xl text-center text-foreground flex items-center justify-center">
              <TrendingUp className="w-8 h-8 mr-3" />
              {t('calculator.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <Label htmlFor="monthlyBill" className="mb-2 block">{t('calculator.billLabel')}</Label>
                <Input
                  id="monthlyBill"
                  type="number"
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(e.target.value)}
                  placeholder={t('calculator.billPlaceholder')}
                  className="form-input"
                />
              </div>
              <div>
                <Label htmlFor="roofSize" className="mb-2 block">{t('calculator.roofSizeLabel')}</Label>
                <Input
                  id="roofSize"
                  type="number"
                  value={roofSize}
                  onChange={(e) => setRoofSize(e.target.value)}
                  placeholder={t('calculator.roofSizePlaceholder')}
                  className="form-input"
                />
              </div>
              <div>
                <Label htmlFor="energyOffset" className="mb-2 block">{t('calculator.offsetLabel')}</Label>
                <Input
                  id="energyOffset"
                  type="number"
                  value={energyOffset}
                  onChange={(e) => setEnergyOffset(e.target.value)}
                  placeholder={t('calculator.offsetPlaceholder')}
                  className="form-input"
                />
              </div>
              <div>
                <Label htmlFor="buildingType" className="mb-2 block">{t('calculator.buildingTypeLabel')}</Label>
                <Select value={buildingType} onValueChange={setBuildingType}>
                  <SelectTrigger id="buildingType" className="form-input">
                    <SelectValue placeholder={t('calculator.buildingTypeLabel')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">{t('calculator.residentialOption')}</SelectItem>
                    <SelectItem value="business">{t('calculator.businessOption')}</SelectItem>
                    <SelectItem value="industrial">{t('calculator.industrialOption')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button onClick={handleCalculate} size="lg" className="w-full bg-black/50 border border-primary text-primary font-bold py-1.5 px-3 text-xs sm:py-3 sm:px-6 sm:text-base rounded-[8px] shadow-lg hover:shadow-xl transform hover:scale-105 hover:bg-[#80ac53] hover:text-primary-foreground transition duration-300 ease-in-out mb-8">
              {t('calculator.calculateBtn')}
            </Button>

            {results && (
              <div className="mt-8 p-6 bg-primary/5 rounded-lg">
                <h3 className="text-xl font-semibold mb-6 text-center text-primary">{t('calculator.resultsTitle')}</h3>
                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
                  <p><strong>{t('calculator.systemSizeLabel')}</strong> {results.systemSizeKw} kW</p>
                  <p><strong>{t('calculator.systemCostLabel')}</strong> {results.systemCostMkd.toLocaleString(locale)} MKD</p>
                  <p><strong>{t('calculator.annualSavingsLabel')}</strong> {results.annualSavingsMkd.toLocaleString(locale)} MKD</p>
                  <p><strong>{t('calculator.paybackPeriodLabel')}</strong> {isFinite(results.paybackPeriodYears) ? `${results.paybackPeriodYears} ${results.paybackPeriodYears === 1 ? 'year' : 'years'}` : 'N/A'}</p>
                  <p className="sm:col-span-2"><strong>{t('calculator.co2ReductionLabel')}</strong> {results.annualCo2ReductionKg.toLocaleString(locale)} kg</p>
                </div>
                <Button size="lg" asChild className="w-full mt-8 bg-black/50 border border-primary text-primary font-bold py-1.5 px-3 text-xs sm:py-3 sm:px-6 sm:text-base rounded-[8px] shadow-lg hover:shadow-xl transform hover:scale-105 hover:bg-[#80ac53] hover:text-primary-foreground transition duration-300 ease-in-out">
                    <Link href={`/${locale}/#contact`}>{t('calculator.getDetailedQuoteBtn')}</Link>
                </Button>
              </div>
            )}
            
            <Alert className="mt-8 border-accent text-accent-foreground bg-accent/10">
              <Info className="h-4 w-4 text-accent" />
              <AlertTitle className="text-accent">{t('calculator.disclaimer').split('.')[0]}</AlertTitle>
              <AlertDescription className="text-foreground">
                {t('calculator.disclaimer').substring(t('calculator.disclaimer').indexOf('.') + 1).trim()}
              </AlertDescription>
            </Alert>

          </CardContent>
        </Card>
      </div>
    </section>
  );
}
