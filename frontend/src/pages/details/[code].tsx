import { useCountryWithContinentLazyQuery } from "@/graphql/generated/schema";
import { useRouter } from "next/router";
import { useEffect } from "react";

function Details() {
  const router = useRouter();
  const [getCountry, { data, loading, error }] =
    useCountryWithContinentLazyQuery();
  useEffect(() => {
    console.log(router.query);
    if (router.isReady) {
      console.log(router.query);
      getCountry({ variables: { code: router.query.code as string } });
    }
  }, [router.query]);

  if (error) {
    return <div>Ce pays n'existe pas</div>;
  }
  return <div className="bg-gray-950">
    <p>{data?.country.emoji}</p>
    <p>Name: {data?.country.name} ({data?.country.code})</p>
    <p>Continent: {data?.country.continent?.name}</p>

  </div>;
}

export default Details;
