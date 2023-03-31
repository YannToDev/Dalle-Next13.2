import React,{FC} from 'react'
import { UserInputsProps } from '@/types'

export const UserInputs:FC<UserInputsProps> =({ handleSubmit, userInputs, setUserInputs, isLoading}) => {

  return (
    
    <form 
      onSubmit={handleSubmit}
      className='bg-openAI_Primary p-6 flex flex-col space-y-3 rounded-lg'>
        <div className='flex items-center space-x-3'>
            <input 
                value={userInputs.title}
                onChange={(e) => setUserInputs({...userInputs, title:e.target.value})}
                type="text" 
                className='input'
                placeholder='Enter Title...'
            />
              <input 
                value={userInputs.tag}
                onChange={(e) => setUserInputs({...userInputs, tag:e.target.value})}
                type="text" 
                className='input'
                placeholder='#AI Open AI'
            />
        </div>

          <input 
                value={userInputs.description}
                onChange={(e) => setUserInputs({...userInputs, description:e.target.value})}
                type="text" 
                className='input'
                placeholder='Enter Description...'
            />

        <button className='btn flex-1'>
            {isLoading? "Generating..." : "Generate"}
        </button>
    </form>
  )
}
