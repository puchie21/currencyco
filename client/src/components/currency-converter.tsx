import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ConversionData {
  fromAmount: number;
  fromCurrency: string;
  toCurrency: string;
  toAmount: number;
  exchangeRate: number;
}

const currencies = [
  "USD", "EUR", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY", "INR", "BRL"
];

export default function CurrencyConverter() {
  const [fromAmount, setFromAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [conversion, setConversion] = useState<ConversionData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}&amount=${fromAmount}`
      );
      const data = await res.json();
      setConversion({
        fromAmount,
        fromCurrency,
        toCurrency,
        toAmount: data.result,
        exchangeRate: data.info.rate,
      });
    } catch (err) {
      console.error("Conversion failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto mt-10 p-4">
      <CardHeader>
        <CardTitle>Currency Converter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4">
          <Input
            type="number"
            value={fromAmount}
            onChange={(e) => setFromAmount(parseFloat(e.target.value))}
          />
          <Select value={fromCurrency} onValueChange={setFromCurrency}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="From" />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((cur) => (
                <SelectItem key={cur} value={cur}>
                  {cur}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={toCurrency} onValueChange={setToCurrency}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="To" />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((cur) => (
                <SelectItem key={cur} value={cur}>
                  {cur}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleConvert} disabled={loading}>
          {loading ? "Converting..." : "Convert"}
        </Button>
        {conversion && (
          <div className="text-center mt-4">
            <p>
              {conversion.fromAmount} {conversion.fromCurrency} ={" "}
              <strong>{conversion.toAmount.toFixed(2)}</strong> {conversion.toCurrency}
            </p>
            <p className="text-sm text-muted">
              Rate: 1 {conversion.fromCurrency} = {conversion.exchangeRate.toFixed(4)}{" "}
              {conversion.toCurrency}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}