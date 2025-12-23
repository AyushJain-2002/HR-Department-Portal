import { Button, Card, Checkbox, Input, Typography } from '@material-tailwind/react';
import React from 'react'

const CreateEmploye = () => {
  return (
    <Card className='m-7 border p-7 ' color="transparent" >
    <Typography variant="h4" color="blue-gray">
      Employee Entry
    </Typography>
    <Typography color="gray" className="mt-1 font-normal">
      Nice to meet you! Enter your details to register.
    </Typography>
    <form className="mt-8 mb-2 w-full max-w-full">
      <div className="mb-1 grid grid-cols-5 gap-6">
      <div className='flex flex-col gap-4'>

        <Typography variant="h6" color="blue-gray" className="-mb-3">
          Your Name
        </Typography>
        <Input
          size="lg"
          placeholder="name@mail.com"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
      </div>
      <div className='flex flex-col gap-4'>

        <Typography variant="h6" color="blue-gray" className="-mb-3">
          Your Email
        </Typography>
        <Input
          size="lg"
          placeholder="name@mail.com"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
      </div>
      <div className='flex flex-col gap-4'>

        <Typography variant="h6" color="blue-gray" className="-mb-3">
          Password
        </Typography>
        <Input
          type="password"
          size="lg"
          placeholder="********"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
      </div>
      </div> 
      <Button className="mt-6" fullWidth>
        sign up
      </Button>
      <Typography color="gray" className="mt-4 text-center font-normal">
        Already have an account?{" "}
        <a href="#" className="font-medium text-gray-900">
          Sign In
        </a>
      </Typography>
    </form>
  </Card>
);
}

export default CreateEmploye
