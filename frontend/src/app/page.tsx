import { redirect } from "next/navigation";

export default function Home() {
  redirect('/questions'); // redirect for assignment 1
  /* return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    </main>
  ) */
}
