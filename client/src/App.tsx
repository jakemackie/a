import useSWR from "swr";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import AddVideo from "./components/postVideo";

export interface Video {
  title: string;
  description: string;
  length: number;
}

export const endpoint = "http://localhost:8000";

console.log(`${endpoint}/api/videos`);

const fetcher = (url: string) =>
  fetch(`${endpoint}/${url}`).then((res) => res.json());

function App() {
  // const { data, mutate } = useSWR<Video[]>("api/videos", fetcher);
  const { data } = useSWR<Video[]>("api/videos", fetcher);

  return (
    <div className="mx-auto min-h-screen max-w-screen-lg flex flex-col items-center p-4 gap-12">
      <div className="lg:mt-8 w-full flex flex-col gap-4">
        {/*         
          <Alert>
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              Any entries added are only stored in memory and will be lost when
              the server is restarted.
            </AlertDescription>
          </Alert>
        
          The form component used to interact with the API
          <AddVideo mutate={mutate} /> 
        */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
          {Array.isArray(data) &&
            data.length > 0 &&
            data.map((video: Video) => (
              <a
                href="#"
                key={video.title}
                className="aspect-video flex flex-col gap-4"
              >
                <div className="overflow-hidden aspect-video w-full rounded-2xl ring-2 ring-foreground">
                  <img
                    src="https://via.placeholder.com/640x360"
                    alt="Video"
                    className="size-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-2xl font-semibold">{video.title}</h2>
                  <p className="text-lg font-medium text-foreground/75">
                    {video.description}
                  </p>
                </div>
              </a>
            ))}
        </div>
      </div>
      {Array.isArray(data) && data.length > 0 && (
        <div className="w-full space-y-4">
          <h2 className="text-2xl">API Data</h2>
          <ul className="max-h-56 w-full overflow-y-scroll flex flex-col p-4 rounded-2xl ring-4">
            {data.map((video) => (
              <li key={video.title + Math.random()}>
                <pre>{JSON.stringify(video, null, 2)}</pre>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
