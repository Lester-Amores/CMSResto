import { Input } from "@/admin/components/ui/input";
import { Label } from "@/admin/components/ui/label";


type DiscountType = 'none' | 'senior' | 'pwd' | 'student' | 'custom';

interface DiscountSelectorProps {
    discountType: string;
    setDiscountType: (type: DiscountType) => void;
    customDiscount: number;
    setCustomDiscount: (val: number) => void;
    idNumber: string;
    setIdNumber: (val: string) => void;
  }
  
  export function DiscountSelector({ discountType, setDiscountType, customDiscount, setCustomDiscount, idNumber, setIdNumber }: DiscountSelectorProps) {
    return (
      <div>
        <Label className="text-xs">Discount Type:</Label>
        <select
          className="w-full border rounded p-1 text-sm dark:bg-black"
          value={discountType}
          onChange={(e) => setDiscountType(e.target.value as DiscountType)}
        >
          <option value="none">None</option>
          <option value="senior">Senior Citizen (20%)</option>
          <option value="pwd">PWD (20%)</option>
          <option value="student">Student (10%)</option>
          <option value="custom">Custom</option>
        </select>
  
        {(discountType === 'senior' || discountType === 'pwd') && (
          <div className="mt-2">
            <Input
              type="text"
              className="w-full border rounded p-1 text-sm"
              placeholder="Enter SC/PWD ID No."
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
            />
          </div>
        )}
  
        {discountType === 'custom' && (
          <div className="mt-2">
            <Input
              type="number"
              min="0"
              value={customDiscount === 0 ? '' : customDiscount}
              onChange={(e) => {
                const value = e.target.value;
                setCustomDiscount(value === '' ? 0 : Number(value));
              }}
              className="w-full border rounded p-1 text-sm"
              placeholder="Enter custom discount (₱)"
            />
          </div>
        )}
      </div>
    );
  }
  