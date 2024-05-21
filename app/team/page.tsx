import Person from "./components/Person";
import { team } from "./constants";

function Team() {
  return (
    <main className=" flex min-h-screen w-full flex-col items-center bg-base-100 px-5 pt-44 sm:pt-32">
      <h2 className="text-4xl font-bold">درباره ما</h2>
      <p className="max-w-3xl py-3">
        خرطوم از یک ایده ساده جستجو در یکی از درس‌های تحلیل داده در دانشگاه شریف
        آغاز شد هسته اصلی تیم خرطوم متشکل از دانشجویان دانشگاه شریف و تهران است.
      </p>
      <div className="grid grid-cols-1 gap-5 py-8 md:grid-cols-2">
        {shuffle(team).map((person, i) => (
          <Person
            className={"duration-1000 animate-in fade-in"}
            key={person.name}
            name={person.name}
            description={person.description}
            image={person.image}
            link={person.link}
          />
        ))}
      </div>
    </main>
  );
}

function shuffle(array: any[]) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export default Team;
