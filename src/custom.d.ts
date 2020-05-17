type Tag = {
  name: string;
  id: number | undefined;
}

type RecordItem = {
  tag: Tag | {};
  notes: string;
  type: string;
  amount: number;
  createdAt?: string;
  numberId: string
}

