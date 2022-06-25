import { CheckCircle, Lock } from 'phosphor-react';
import { isPast, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR';
import { Link, useParams } from 'react-router-dom';

import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';

interface LessonProps {
    title: string;
    slug: string;
    availableAt: Date;
    type: 'live' | 'class';
}

export function Lesson(props: LessonProps) {
    const { slug } = useParams<{ slug: string }>();

    const isLessonAvailable = isPast(props.availableAt);
    const availableDateFormatted = format(props.availableAt, "EEEE' • 'd' de 'MMMM' • 'k'h'mm", {
        locale: ptBR,
    })

    const isActiveLesson = slug == props.slug;

    return (
        <Link to={`/event/lesson/${props.slug}`} className='group'>
            <span>
                <span className="text-gray-300">
                    {availableDateFormatted}
                </span>

                <div className={classNames('lesson rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500', {
                    'bg-green-500': isActiveLesson,
                    'after:block after:content-[ ] after:w-0 after:h-0 after:border-t-[9.5px] after:border-t-transparent after:border-r-[9px] after:border-r-green-500 after:border-b-[9.5px] after:border-b-transparent after:rounded after:absolute after:translate-x-[-24px] after:translate-y-[-40px]': isActiveLesson
                })}>
                    <header className="flex items-center justify-between">
                        {isLessonAvailable ? (
                            <span className={classNames("text-sm font-medium flex items-center gap-2", {
                                'text-white': isActiveLesson,
                                'text-blue-500': !isActiveLesson
                            })}>
                                <CheckCircle size={20} />
                                Conteúdo liberado
                            </span>
                        ) : (
                            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
                                <Lock size={20} />
                                Em breve
                            </span>
                        )}

                        <span className={classNames("text-xs rounded py-[0.125rem] px-2 text-white border font-bold uppercase", {
                            'border-green-300': !isActiveLesson,
                            'border-white': isActiveLesson,
                        })}>
                            {props.type == 'live' ? 'ao vivo' : 'aula prática'}
                        </span>
                    </header>

                    <strong className={classNames('mt-5 block', {
                        'text-white': isActiveLesson,
                        'text-gray-200': !isActiveLesson
                    })}>
                        {props.title}
                    </strong>
                </div>
            </span>
        </Link >
    )
}