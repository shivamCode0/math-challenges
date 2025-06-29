import Link from "next/link";
import Head from "next/head";
import categories from "../util/categories";
import banner from "./../img/banner.png";

function Home() {
  return (
    <div>
      <Head>
        <title>Math Challenges - Improve and Test Your Math Skills</title>
        <link rel="canonical" href="https://math.shivam.pro" />
      </Head>
      <div className="container col-xxl-8 px-4 py-3 pb-0">
        <div className="row flex-md-row-reverse align-items-center g-3 py-3 pb-0">
          <div className="col-10 col-sm-8 col-md-6">
            <img src={banner.src} className="d-block mx-lg-auto img-fluid" alt="" loading="lazy" style={{ height: "12rem", maxHeight: "calc(10vh + 10vw)", objectFit: "cover" }} />
          </div>
          <div className="col-md-6">
            <h1 className="display-6 lh-1 mb-3" style={{ fontWeight: 600 }}>
              Welcome to Math Challenges!
            </h1>
            <p className="lead fw-normal mb-2">Make learning math fun and test yourself with these fast-paced challenges.</p>
          </div>
        </div>
      </div>
      <div className="container-lg">
        {/* <h1 className="text-center my-3">Welcome to Math Challenges!</h1>
      <p className="text-center my-3">Test yourself with these fast-paced challenges.</p> */}
        <hr className="mt-2" />
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {categories.map((v) => (
            <Link href={`/c/${v.id}`} key={v.id}>
              <a className="category-item card-1" style={{ borderColor: v.color }}>
                <img src={v.img} className="card-img-top" alt="" />
                <div className="card-body">
                  <h4 className="card-title">{v.title}</h4>
                  <p className="card-text">{v.desc}</p>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
