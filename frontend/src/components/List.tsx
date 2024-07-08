import { useCountriesLazyQuery } from "@/graphql/generated/schema";
import Link from "next/link";
import Form from "./Form";
import { useEffect } from "react";

function List() {
  const [getCountries, { data, loading }] = useCountriesLazyQuery();
  useEffect(() => {
    getCountries();
  },[])
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Form getCountries={getCountries} />
          <ul>
            {data?.countries.map((c) => (
              <li key={c.id}>
                <Link href={`/details/${c.code}`}>
                  {c.emoji}
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default List;
