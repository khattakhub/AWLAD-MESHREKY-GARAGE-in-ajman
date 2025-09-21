import React from 'react';
import WrenchIcon from './WrenchIcon';
import OilDropIcon from './OilDropIcon';
import BrakeIcon from './BrakeIcon';
import AcIcon from './AcIcon';
import TireIcon from './TireIcon';
import SparkleIcon from './SparkleIcon';
import CalculatorIcon from './CalculatorIcon';
import FuelIcon from './FuelIcon';
import CarTagIcon from './CarTagIcon';

export const iconMap: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  wrench: WrenchIcon,
  oil: OilDropIcon,
  brake: BrakeIcon,
  ac: AcIcon,
  tire: TireIcon,
  sparkle: SparkleIcon,
  calculator: CalculatorIcon,
  fuel: FuelIcon,
  carTag: CarTagIcon,
};

export const iconNames = Object.keys(iconMap);