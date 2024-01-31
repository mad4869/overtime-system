'use client'

import { PropsWithChildren, useEffect } from "react"

type Recap = {
    isRecap: boolean
    indexRecap: number
    isRecapApproved: boolean
}
type AccordionProps = PropsWithChildren & {
    title: string
    recap?: Recap
}

const Accordion = ({ title, recap = { isRecap: false, indexRecap: 0, isRecapApproved: false }, children }: AccordionProps) => {
    useEffect(() => {
        const init = async () => {
            const { Collapse, initTE } = await import('tw-elements')
            initTE({ Collapse })
        }

        init()
    }, [])

    return (
        <div id="accordion">
            <div
                className="bg-white border rounded-t-lg border-primary-200">
                <h2 className="mb-0" id="headingOne">
                    <button
                        className="group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
                        type="button"
                        data-te-collapse-init
                        data-te-collapse-collapsed
                        data-te-target={`#collapsed${recap.indexRecap}`}
                        aria-expanded="false"
                        aria-controls={`collapsed${recap.indexRecap}`}>
                        <div className="flex flex-col justify-center lg:hidden gap-1 text-sm md:text-base">
                            {title}
                            {recap.isRecap &&
                                <span className={`
                                ${recap.isRecapApproved ? 'bg-emerald-400' : 'bg-neutral-400'} 
                                text-white px-2 py-px rounded-full text-xs w-fit
                                `}>
                                    {recap.isRecapApproved ? 'Disetujui' : 'Belum Disetujui'}
                                </span>
                            }
                        </div>
                        <span className="hidden lg:inline">{title}</span>
                        {recap.isRecap &&
                            <span className={`
                                ${recap.isRecapApproved ? 'bg-emerald-400' : 'bg-neutral-400'} 
                                text-white px-2 py-px rounded-full text-xs ml-2 hidden lg:inline
                            `}>
                                {recap.isRecapApproved ? 'Disetujui' : 'Belum Disetujui'}
                            </span>
                        }
                        <span
                            className="ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </span>
                    </button>
                </h2>
                <div
                    id={`collapsed${recap.indexRecap}`}
                    className="!visible hidden"
                    data-te-collapse-item
                    aria-labelledby="headingOne"
                    data-te-parent="#accordion">
                    <div className="px-5 py-4">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Accordion
