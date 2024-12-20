import Image from "next/image";
import Logo from "@/assets/logo.png"

export default function Us() {
    return (
        <>
            <section className="mx-auto">                
                <article className="bg-blue-950 h-60 flex justify-center items-center rounded-lg shadow-lg">
                    <h1 className="text-white text-5xl font-extrabold text-center">
                        Sobre Nosotros
                    </h1>
                </article>
                
                <main className="bg-blue-100 p-12 rounded-lg shadow-lg flex justify-center items-center">
                    <article className="text-center md:text-left w-full space-y-8">
                        <p className="text-xl text-justify leading-relaxed text-gray-800">
                            Bienvenidos a <span className="font-semibold">BuscaTec</span>, la plataforma líder en la publicación y búsqueda de objetos perdidos y encontrados. 
                            Nuestra misión es conectar personas que han perdido sus pertenencias con quienes las han encontrado, facilitando el proceso de recuperación y fomentando una comunidad solidaria y colaborativa.
                        </p>
                        <p className="text-xl text-justify leading-relaxed text-gray-800">
                            Desarrollada por el <span className="font-semibold">Equipo A</span>, BuscaTec nace con el propósito de ser un recurso confiable y accesible donde cualquier usuario puede registrar sus objetos perdidos y revisar las publicaciones de otros usuarios. 
                            Entendemos la importancia de cada objeto en la vida de las personas, desde lo material hasta lo sentimental, y por eso hemos diseñado un espacio en línea donde la comunicación para reclamar objetos puede gestionarse fácilmente y de manera segura.
                        </p>
                        <p className="text-xl text-justify leading-relaxed text-gray-800">
                            Nuestro equipo se enfoca en crear una plataforma intuitiva y práctica, que permite publicar anuncios de forma rápida y eficiente, manteniendo siempre la confidencialidad de los datos. Si has encontrado un objeto y quieres devolverlo a su dueño o has perdido algo importante y deseas recuperarlo, en <span className="font-semibold">BuscaTec</span> podrás conectar con personas en situaciones similares, asegurando un camino rápido hacia la recuperación.
                        </p>
                    </article>

                    <div className="flex justify-start">
                        <Image
                            src={Logo}
                            alt="logo"
                            width={373}
                            className="rounded-3xl ml-6"
                        />
                    </div>
                </main>
            </section>
        </>
    );
}
