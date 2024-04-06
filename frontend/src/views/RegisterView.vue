<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
</script>

<template>
    <div class="bg-slate-900 h-screen justify-center flex items-center">
        <Card class="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle class="text-xl">
                    Sign Up
                </CardTitle>
                <CardDescription>
                    Enter your information to create an account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div class="grid gap-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div class="grid gap-2">
                            <Label for="first-name">First name</Label>
                            <Input id="first-name" placeholder="Max" required />
                        </div>
                        <div class="grid gap-2">
                            <Label for="last-name">Last name</Label>
                            <Input id="last-name" placeholder="Robinson" required />
                        </div>
                    </div>
                    <div class="grid gap-2">
                        <Label for="username">Username</Label>
                        <Input id="username" type="text" placeholder="MaxRobinson" required />
                    </div>
                    <div class="grid gap-2">
                        <Label for="email">Email</Label>
                        <Input id="email" type="email" placeholder="m@example.com" required />
                    </div>
                    <div class="grid gap-2">
                        <Label for="password">Password</Label>
                        <Input id="password" type="password" />
                    </div>
                    <Button type="submit" class="w-full">
                        Create an account
                    </Button>
                    <Button variant="outline" class="w-full hidden">
                        Sign up with GitHub
                    </Button>
                </div>
                <div class="mt-4 text-center text-sm">
                    Already have an account?
                    <RouterLink to="/login">Sign In</RouterLink>
                </div>
            </CardContent>
        </Card>
    </div>

</template>