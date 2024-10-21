import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

import { endpoint, Video } from "@/App";
import { KeyedMutator } from "swr";
import { FormEvent } from "react";

function AddVideo({ mutate }: { mutate: KeyedMutator<Video[]> }) {
  async function postVideo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const values = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      length: parseInt(formData.get("length") as string),
    };

    try {
      const response = await fetch(`${endpoint}/api/videos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const responseText = await response.text();
      const updated = JSON.parse(responseText);
      mutate(updated);
    } catch (error) {
      console.error("Error posting video:", error);
    }
  }

  return (
    <form onSubmit={postVideo} className="w-full flex flex-col gap-4">
      <Input type="text" name="title" placeholder="Title" required />

      <Textarea name="description" placeholder="Description" required />

      <Input type="number" name="length" placeholder="Length" required />

      <Button type="submit" className="w-fit">
        Add
      </Button>
    </form>
  );
}

export default AddVideo;
