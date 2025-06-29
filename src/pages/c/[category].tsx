import twemoji from "twemoji";
import cView from "../../util/levels";
import categories from "../../util/categories";
import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import Head from "next/head";

export const getStaticPaths: GetStaticPaths = async (ctx) => ({
  paths: categories.map((c) => ({ params: { category: c.id } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps = async function (ctx) {
  const cat: string = ctx.params?.category as any;
  if (!cat) {
    console.log(1);
    return { notFound: true };
  }
  const category = categories.find((v) => v.id === cat);

  return { props: { category } };
};

function Home({ category }) {
  let cViewGen = (
    data: {
      name: string;
      modes: {
        name: string;
        mode: string;
      }[][];
    }[]
  ) => (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {data.map((v) => (
        <div className="card m-2 card-1 level-group" key={v.name}>
          <div className="card-body p-2">
            <h3 className="card-title text-center my-3">{v.name}</h3>
            {v.modes.map((u, i) => (
              <ul key={i} style={{ lineHeight: 1.75 }} className="me-3">
                {u.map((v1, i) => (
                  <li key={v1.mode}>
                    <Link href={`/play/${v1.mode}`}>
                      <a style={{ textDecoration: "none" }} className="text-indigo" dangerouslySetInnerHTML={{ __html: twemoji.parse(v1.name, { folder: "svg", ext: ".svg" }) }} />
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <Head>
        <title>{`${category.title} | Math Challenges - Improve and Test Your Math Skills`}</title>
      </Head>
      {/* <h1 className="text-center my-3">{category.title}</h1>
      <hr /> */}
      <ul className="nav nav-tabs mb-3" style={{ justifyContent: "center" }}>
        {categories.map((v) => (
          <li className="nav-item" key={v.id}>
            <Link href={`/c/${v.id}`}>
              <a className={`nav-link${category.id === v.id ? " active" : ""}`}>{v.title}</a>
            </Link>
          </li>
        ))}
      </ul>
      <div className="container-fluid">
        <h1 className="text-center">{category.title}</h1>
        <p className="text-center">{category.desc}</p>
        <div>{cViewGen(cView[category.id])}</div>
      </div>
    </div>
  );
}

export default Home;
