import React from 'react';

import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const InputFloating = React.forwardRef<
    HTMLInputElement,
    React.InputHTMLAttributes<HTMLInputElement>
>(
    ({ className, ...props }, ref) => {
        return <Input placeholder=" " className={cn('peer', className)} ref={ref} {...props} />;
    },
);
InputFloating.displayName = 'InputFloating';

const InputFloatingLabel = React.forwardRef<
    React.ComponentRef<typeof Label>,
    React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
    return (
        <Label
            ref={ref}
            {...props}
            className={cn(
                'peer-focus:secondary peer-focus:dark:secondary absolute start-2 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-background px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 dark:bg-background peer-focus:rtl:left-auto peer-focus:rtl:translate-x-1/4 cursor-text',
                className,
            )}
        />
    );
});
InputFloatingLabel.displayName = 'InputFloatingLabel';

interface InputFloatingWithLabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
}

const InputFloatingWithLabel = React.forwardRef<
    React.ComponentRef<typeof InputFloating>,
    React.PropsWithoutRef<InputFloatingWithLabelProps>
>(({ id, label, ...props }, ref) => {
    return (
        <div className="relative">
            <InputFloating ref={ref} id={id} {...props} />
            <InputFloatingLabel htmlFor={id}>{label}</InputFloatingLabel>
        </div>
    );
});
InputFloatingWithLabel.displayName = 'InputFloatingWithLabel';

export {
    InputFloating,
    InputFloatingLabel,
    InputFloatingWithLabel
};