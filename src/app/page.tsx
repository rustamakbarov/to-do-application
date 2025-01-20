import UserSignForm from "@/_components/UserSignForm";

export default function Home() {
  return (
    <>
      <div className="home-container">
        <h2 className="hello-mesage">
          Merhaba, to-do listi kullana bilmeniz için bir kullanıcı oluşturmanız
          gerekiyor.
        </h2>
        <UserSignForm />
      </div>
    </>
  );
}
