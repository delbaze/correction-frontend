import {
  CountriesQuery,
  Exact,
  useAddCountryMutation,
  useContinentsQuery,
} from "@/graphql/generated/schema";
import { LazyQueryExecFunction } from "@apollo/client/react/types/types";
import { useState } from "react";

interface FormType {
  name: string;
  emoji: string;
  code: string;
  continent?: string;
}
function Form({
  getCountries,
}: {
  getCountries: LazyQueryExecFunction<
    CountriesQuery,
    Exact<{
      [key: string]: never;
    }>
  >;
}) {
  const [state, setState] = useState<FormType>({
    name: "",
    emoji: "",
    code: "",
    continent: "",
  });

  const [createCountry] = useAddCountryMutation();

  const { data } = useContinentsQuery();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | undefined
  ) => {
    const datatype = e?.target.dataset.type as string;
    console.log("TEST", e?.target.value);
    setState({ ...state, [datatype]: e?.target.value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | undefined) => {
    e?.preventDefault();
    console.log(state);
    createCountry({
      variables: { data: { ...state } },
      onCompleted(data) {
        setState({ name: "", code: "", emoji: "" });
        getCountries({ fetchPolicy: "no-cache" });
      },
      onError(error) {
        console.log("ERROR", error);
      },
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          data-type="name"
          onChange={handleChange}
          value={state.name}
        />
        <input
          placeholder="Emoji"
          data-type="emoji"
          onChange={handleChange}
          value={state.emoji}
        />
        <input
          placeholder="Code"
          data-type="code"
          onChange={handleChange}
          value={state.code}
        />
        <select onChange={handleChange} data-type="continent">
          <option></option>
          {data?.continents.map((c) => (
            <option value={c.id}>{c.name}</option>
          ))}
        </select>
        <button>Ajouter</button>
      </form>
    </div>
  );
}

export default Form;
