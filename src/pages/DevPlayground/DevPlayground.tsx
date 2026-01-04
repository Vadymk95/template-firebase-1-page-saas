import { Loader2 } from 'lucide-react';
import type { FC } from 'react';
import { useState } from 'react';

import { FeedbackForm } from '@/components/features/FeedbackForm';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { FEEDBACK_SOURCES } from '@/constants/feedback';

export const DevPlayground: FC = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [radioValue, setRadioValue] = useState('option1');

    return (
        <div className="container mx-auto max-w-6xl space-y-8 p-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">Dev UI Playground</h1>
                <p className="text-muted-foreground">
                    Visualize and test UI components in isolation during development.
                </p>
            </div>

            <hr className="border-border" />

            {/* Buttons Section */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight">Buttons</h2>
                <Card>
                    <CardHeader>
                        <CardTitle>Button Variants</CardTitle>
                        <CardDescription>Different styles and sizes of buttons</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-muted-foreground">Variants</h3>
                            <div className="flex flex-wrap gap-4">
                                <Button variant="default">Default</Button>
                                <Button variant="secondary">Secondary</Button>
                                <Button variant="outline">Outline</Button>
                                <Button variant="ghost">Ghost</Button>
                                <Button variant="link">Link</Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-muted-foreground">Sizes</h3>
                            <div className="flex flex-wrap items-center gap-4">
                                <Button size="sm">Small</Button>
                                <Button size="default">Default</Button>
                                <Button size="lg">Large</Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-muted-foreground">States</h3>
                            <div className="flex flex-wrap items-center gap-4">
                                <Button disabled>Disabled</Button>
                                <Button variant="secondary" disabled>
                                    Disabled (Secondary)
                                </Button>
                                <Button
                                    disabled={isLoading}
                                    onClick={() => {
                                        setIsLoading(true);
                                        setTimeout(() => setIsLoading(false), 2000);
                                    }}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Loading...
                                        </>
                                    ) : (
                                        'Load'
                                    )}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Inputs Section */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight">Input Fields</h2>
                <Card>
                    <CardHeader>
                        <CardTitle>Input and Label</CardTitle>
                        <CardDescription>Different types of input fields</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="email-demo">Email</Label>
                                <Input
                                    id="email-demo"
                                    type="email"
                                    placeholder="example@gmail.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="disabled-demo">Disabled Field</Label>
                                <Input id="disabled-demo" disabled placeholder="Cannot type" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password-demo">Password</Label>
                                <Input id="password-demo" type="password" placeholder="••••••••" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="file-demo">File</Label>
                                <Input id="file-demo" type="file" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Textarea Section */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight">Text Area</h2>
                <Card>
                    <CardHeader>
                        <CardTitle>Textarea</CardTitle>
                        <CardDescription>Multi-line input field</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <Label htmlFor="textarea-demo">Message</Label>
                            <Textarea
                                id="textarea-demo"
                                placeholder="Enter your text here..."
                                rows={4}
                            />
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Radio Group Section */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight">Radio Buttons</h2>
                <Card>
                    <CardHeader>
                        <CardTitle>RadioGroup</CardTitle>
                        <CardDescription>
                            A group of radio buttons for selecting a single value
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-muted-foreground">
                                Basic Example
                            </h3>
                            <RadioGroup value={radioValue} onValueChange={setRadioValue}>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="option1" id="option1" />
                                    <Label htmlFor="option1" className="cursor-pointer">
                                        Option 1
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="option2" id="option2" />
                                    <Label htmlFor="option2" className="cursor-pointer">
                                        Option 2
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="option3" id="option3" />
                                    <Label htmlFor="option3" className="cursor-pointer">
                                        Option 3
                                    </Label>
                                </div>
                            </RadioGroup>
                            <p className="text-sm text-muted-foreground">
                                Selected: <strong>{radioValue}</strong>
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-muted-foreground">
                                Disabled Group
                            </h3>
                            <RadioGroup value="option1" disabled>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="option1" id="disabled-option1" />
                                    <Label
                                        htmlFor="disabled-option1"
                                        className="cursor-not-allowed opacity-50"
                                    >
                                        Disabled Option 1
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="option2" id="disabled-option2" />
                                    <Label
                                        htmlFor="disabled-option2"
                                        className="cursor-not-allowed opacity-50"
                                    >
                                        Disabled Option 2
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-muted-foreground">
                                Horizontal Layout
                            </h3>
                            <RadioGroup
                                value={radioValue}
                                onValueChange={setRadioValue}
                                className="flex gap-6"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="option1" id="horizontal-option1" />
                                    <Label htmlFor="horizontal-option1" className="cursor-pointer">
                                        Option A
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="option2" id="horizontal-option2" />
                                    <Label htmlFor="horizontal-option2" className="cursor-pointer">
                                        Option B
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Cards Section */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight">Cards</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Simple Card</CardTitle>
                            <CardDescription>Example of a basic card with content</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                This is an example of simple content inside a card. You can use
                                cards to group related information.
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full">
                                Action
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Card with Color Accent</CardTitle>
                            <CardDescription>Variant with additional styles</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Cards can have different styles and display variants depending on
                                your interface needs.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Dialog Section */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight">Dialogs</h2>
                <Card>
                    <CardHeader>
                        <CardTitle>Modal Dialog</CardTitle>
                        <CardDescription>Modal windows for important information</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                            <DialogTrigger asChild>
                                <Button>Open Dialog</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Example Dialog</DialogTitle>
                                    <DialogDescription>
                                        This is an example of a modal dialog. You can use it for
                                        confirming actions, displaying forms, or important
                                        information.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="dialog-input">Input Field</Label>
                                        <Input id="dialog-input" placeholder="Enter value" />
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button variant="outline" onClick={() => setDialogOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button onClick={() => setDialogOpen(false)}>Confirm</Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </CardContent>
                </Card>
            </section>

            {/* Feedback Form Section */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight">Feedback Form</h2>
                <Card>
                    <CardHeader>
                        <CardTitle>FeedbackForm</CardTitle>
                        <CardDescription>
                            Complete form with validation and error handling
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="max-w-md">
                            <FeedbackForm source={FEEDBACK_SOURCES.FOOTER} />
                        </div>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
};
