import { Input } from '../ui/input'
import { Button } from '../ui/button'

export default function DetailForm({ title, fields, buttons, table }: any) {
    return (
        <div className='max-w-7xl mx-auto p-6'>
            <div className='flex md:flex-row flex-col items-center justify-between gap-4 mb-6'>
                <h3 className='text-2xl font-semibold tracking-tight'>{title}</h3>
                <div className='flex items-center justify-end gap-2'>
                    {
                        buttons?.map((button: any) => (
                            <Button
                                className='cursor-pointer'
                                key={button.id}
                                onClick={()=> button.onClick}
                                size='sm'
                                type={button.type}
                                variant={button.variant}>
                                {button.text}
                            </Button>
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
                        />
                    ))
                }
            </div>
        </div>
    )
}
