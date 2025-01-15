import { useState } from 'react';
import Calendar from 'react-calendar';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export function Calender() {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className='z-50 relative' >
      <Calendar onChange={onChange} value={value} />
    </div>
  );
}