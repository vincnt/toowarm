import Link from "next/link";
import { useEffect } from "react";
import Layout from "../components/Layout";
import { createUser } from "../lib/firebase-db";

const IndexPage = () => {
  useEffect(() => {
    console.log("effect");
    createUser("testUID", { data: "hi" });
  }, []);

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Hello Next.js 👋</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
    </Layout>
  );
};

export default IndexPage;
