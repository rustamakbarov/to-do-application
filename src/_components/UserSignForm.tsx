"use client";

import { userStore } from "@/_store/userStore";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserSignForm() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  const createUser = userStore((state: any) => state.createUser);

  async function handleForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    //Kullanici kayitli mi degil mi kontrol etme
    let response = await fetch(`/api/getUserApi?name=${name}&email=${email}`);

    if (!response.ok) {
      const data = await response.json();

      //Eger kullanıcı bulunamadıysa yeni kullanıcı yarat
      if (data.message === "User not found" || response.status === 404) {
        response = await fetch("/api/createUserApi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email }),
        });

        if (response.ok) {
          const user = await response.json();

          // Yeni kullaniciyi state'ye tanimlama
          createUser(user);
          // Todo sayfasına yönlendirme
          router.push("/todo");
        } else {
          console.error("Failed to create user:", await response.json());
        }
      } else {
        console.error(data.message);
      }
    } else {
      const user = await response.json();
      // Yeni kullaniciyi state'ye tanimlama
      createUser(user);
      // Todo sayfasına yönlendirme
      router.push("/todo");
    }
  }

  return (
    <form className="sign" onSubmit={handleForm}>
      <span>
        <label htmlFor="name">İsminiz</label>
        <input
          type="text"
          required
          id="name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
      </span>
      <span>
        <label htmlFor="email">E-posta adresiniz</label>
        <input
          type="email"
          required
          id="email"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
      </span>

      <button type="submit">Uygulamayı Başlat</button>
    </form>
  );
}
