export type ExerciseData = {
    /* Create type declaration for the form */
    exercise: string;
    type: string;
    amount: number | '';
    reps: number | '';
    sets: number | '';
    rest: number | '';
};

export type ProfileData = {
    name: string;
    age: number | '';
    sex:string;
    height:number | '';
    weightNow:number | ''; 
    weightGoal:number | ''; 
};

export type ProgressData = {
    date: string;
    weight:number | '';
}

export type AppContext = {
    coinList: Coin[]
    currency: Currency
    setCurrency: React.Dispatch<React.SetStateAction<Currency>>
    coinTable: Coin[]
    setCoinTable: React.Dispatch<React.SetStateAction<Coin[]>>
    portfolio : Ledger[]
    setPortfolio : React.Dispatch<React.SetStateAction<Ledger[]>>
  }