import { auth, signOut } from "@/auth"
import Image from "next/image"
import Link from "next/link"
import Logo from "@/assets/logo.png"



export default async function UserHeader(){

    const session = await auth()


    return (
        <header className="pt-4">
            <nav className="flex justify-between mr-4">
                <Link href={'/'}>
                    <Image 
                        src={Logo}
                        alt="logo"
                        width={70}
                        className="rounded-full px-2 mb-1"
                    />
                </Link>
                <ul className="flex justify-end gap-4 items-center">
                    <li>
                        <Link href={"/"}>Inicio</Link>
                    </li>
                    <li>
                        <Link href={'/objects'}>OBJETOS</Link>
                    </li>
                
                    {
                        session ? <>
                            <li>
                                <Link href={'/my-objects'}>Mis objetos</Link>
                            </li>
                            <li>
                                <span>Bienvenido: {session.user?.name}</span>
                            </li>
                            <form action={async () => {
                                "use server"
                                await signOut()
                            }}>
                                <button className="bg-blue-950 text-white py-2 px-4 rounded-md mb-1 mr-1">
                                    <Link href={"/ad"}>Añadir anuncio</Link>
                                </button>
                                <button type="submit" className="bg-red-500 text-white py-2 px-4 rounded-md mb-1">Cerrar Sesion</button>
                            </form>
                        </>
                        : <Link href={'/login'}>INICIAR SESIOIN</Link>
                    }

                    
                </ul>
            </nav>
            

        </header>
    )
}
