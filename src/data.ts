import { Transaction } from "./types";
import { v4 as uuidv4 } from "uuid";

export const createTransactionData = (): Transaction[] => [
  {
    id: "6963af28-0cbe-4566-b064-31e4b5ada484",
    name: "Vipps *12345 Sodexo",
    date: 1632234732,
    amount: 60.0,
  },
  {
    id: "f795cd91-f461-43a5-88cf-79dc57b91dba",
    name: "Adobe Products",
    date: 1633357932,
    amount: 117.5,
  },
  {
    id: "ce0c43f2-554f-4c07-9336-1ca0cbbea4db",
    name: "Rema Oslo",
    date: 1633789932,
    amount: 452.29,
  },
  {
    id: "074aff7c-1b61-483c-9137-aeb69e0682d5",
    name: "Netflix.com",
    date: 1635258732,
    amount: 109.0,
  },
  {
    id: "12a147ea-e09a-4a45-89da-f17c24a6517f",
    name: "YouTube Prem",
    date: 1636122732,
    amount: 69.0,
  },
  {
    id: "391102ea-49e5-4619-b76d-2a7d97957f56",
    name: "If Skadeforsikring",
    date: 1637937132,
    amount: 377.0,
  },
  {
    id: "bc074c52-047d-4289-9c6d-322d2a7b8ccb",
    name: "Apple.Com/bill",
    date: 1640269932,
    amount: 59.0,
  },
  {
    id: "29e1426a-24f0-4fc4-a2d2-2ce249b6b606",
    name: "Telenor Norge As",
    date: 1640701932,
    amount: 849.0,
  },
  {
    id: "0673a549-c3f0-4ebd-bcb0-f2ac41de246a",
    name: "Vipps:Ruter",
    date: 1642084332,
    amount: 1443.0,
  },
];

export const createLongTransactionData = () => {
  let longList = createTransactionData();
  let i = 0;
  while (i < 10000) {
    longList.push({ id: uuidv4(), name: "Vipps", amount: i, date: Date.now() });
    i++;
  }
  return longList;
};
