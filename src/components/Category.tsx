import { Link, useParams } from "react-router-dom";
import twemoji from "twemoji";
import cView from "../util/levels";
import categories from "./../util/categories";

function Home() {
  let { category: cat }: { category: string } = useParams();
  const category = categories.find((v) => v.id === cat);
  document.title = `${category.title} | Math Challenges - Improve and Test Your Math Skills`;

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
                    <Link
                      to={`/play/${v1.mode}`}
                      style={{ textDecoration: "none" }}
                      className="text-indigo"
                      dangerouslySetInnerHTML={{ __html: twemoji.parse(v1.name, { folder: "svg", ext: ".svg" }) }}
                    />
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
      {/* <h1 className="text-center my-3">{category.title}</h1>
      <hr /> */}
      <ul className="nav nav-tabs mb-3" style={{ justifyContent: "center" }}>
        {categories.map((v) => (
          <li className="nav-item" key={v.id}>
            <Link className={`nav-link${cat === v.id ? " active" : ""}`} to={`/c/${v.id}`}>
              {v.title}
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
