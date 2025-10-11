import { Label } from '@radix-ui/react-dropdown-menu'
import { Input } from '../ui/input'
import { Link } from 'react-router-dom'

export default function DetailForm({ title, fields, buttons }: any) {
    return (
        <div className='max-w-7xl mx-auto p-6'>
            <div className='flex md:flex-row flex-col items-center justify-between gap-4 mb-6'>
                <h3 className='text-2xl font-semibold tracking-tight'>{title}</h3>
                <div className='flex items-center justify-end gap-2'>
                    {
                        buttons?.map((button: any) => (
                            <Link
                                className='cursor-pointer border p-2 rounded-md text-sm'
                                key={button.id}
                                to={button.to}
                            >
                                {button.text}
                            </Link>
                        ))
                    }
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-4'>
                {
                    fields?.map((field: any) => (
                        <Input
                            key={field.id}
                            type={field.type}
                            placeholder={field.placeholder}
                            name={field.name}
                            value={field.value}
                        />
                    ))
                }
            </div>
        </div>
    )
}
