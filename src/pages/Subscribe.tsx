import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Logo } from "../components/Logo";
import { useCreateSubscriberMutation } from "../graphql/generated";

import codeMackupImgSrc from "../assets/code-mackup.png";

export function Subscribe() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const [createSubscriber, { loading }] = useCreateSubscriberMutation();

    async function handleSubscribe(event: FormEvent) {
        event.preventDefault();

        await createSubscriber({
            variables: {
                name,
                email,
            }
        })

        navigate('/event');
    }


    return (
        <div className="flex flex-col items-center bg-no-repeat bg-cover bg-[url(../../src/assets/blur-background.png)]">
            <div className="bg-[url(../../src/assets/react-icon.png)] bg-top bg-no-repeat">
                <div className="w-full max-w-[1216px] flex items-center gap-[210px] mt-20 mx-auto">
                    <div className="max-w-[624px]">
                        <Logo />

                        <h1 className="mt-8 text-[2.5rem] leading-tight">
                            Construa uma <strong className="text-blue-500">aplicação completa</strong>, do zero, com <strong className="text-blue-500">React</strong>
                        </h1>
                        <p className="mt-4 text-gray-200 leading-relaxed">
                            Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com alta demanda para acessar as melhores oportunidades do mercado.
                        </p>
                    </div>

                    <div className="p-8 bg-gray-700 border border-gray-500 rounded">
                        <div className="text-2xl mb-6 block">Inscreva-se gratuitamente</div>

                        <form onSubmit={handleSubscribe} className="flex flex-col gap-2 w-ful">
                            <input
                                className="bg-gray-900 rounded px-5 h-14"
                                type="text"
                                placeholder="Seu nome completo"
                                onChange={event => setName(event.target.value)}
                            />

                            <input
                                className="bg-gray-900 rounded px-5 h-14"
                                type="email"
                                placeholder="Digite seu e-mail"
                                onChange={event => setEmail(event.target.value)}
                            />

                            <Button
                                title="Garantir minha vaga"
                                variant="primary"
                                type="submit"
                                disabled={loading}
                                extraStyles="mt-4 disabled:opacity-50"
                            />
                        </form>
                    </div>
                </div>

                <img src={codeMackupImgSrc} className="mt-10" />
            </div>
        </div>
    )
}