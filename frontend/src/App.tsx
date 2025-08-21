import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Copy, Play } from 'lucide-react'
import { useState } from 'react'
import { Button } from './components/ui/button'
import { Checkbox } from './components/ui/checkbox'
import { Label } from './components/ui/label'
import { Textarea } from './components/ui/textarea'
import { ThemeProvider } from './components/ui/theme-provider'

function App() {
  const [prompt, setPrompt] = useState(localStorage.getItem('prompt') || '')
  const [script, setScript] = useState('')
  const [result] = useState('hello world')
  const [rememberPrompt, setRememberPrompt] = useState(localStorage.getItem('rememberPrompt') === 'true' ? true : false)
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <div className='flex h-screen w-full flex-col items-center gap-4 pt-20 pb-10'>
        <Tabs defaultValue='script' className='w-[400px]'>
          <TabsList>
            <TabsTrigger value='prompt'>🤖 Prompt</TabsTrigger>
            <TabsTrigger value='script'>📜 Script</TabsTrigger>
            <TabsTrigger value='result'>✨ Result</TabsTrigger>
          </TabsList>
          <TabsContent value='prompt' className='flex flex-col gap-3'>
            <Textarea
              onChange={e => setPrompt(e.target.value)}
              value={prompt}
              placeholder='Prompt here'
              className='h-[50vh] max-h-[50vh]'
            />
            <div className='flex items-center gap-3'>
              <Checkbox
                id='terms'
                checked={rememberPrompt}
                onCheckedChange={checked => {
                  localStorage.setItem('prompt', prompt)
                  localStorage.setItem('rememberPrompt', JSON.stringify(!!checked))
                  setRememberPrompt(!!checked)

                  if (!checked) {
                    localStorage.removeItem('prompt')
                    localStorage.removeItem('rememberPrompt')
                  }
                }}
              />
              <Label htmlFor='terms'>Remember prompt</Label>
            </div>
          </TabsContent>
          <TabsContent value='script'>
            <Textarea
              onChange={e => setScript(e.target.value)}
              value={script}
              placeholder='Script here'
              className='h-[50vh] max-h-[50vh]'
            />
          </TabsContent>
          <TabsContent value='result'>
            <Textarea value={result} placeholder='Result here' className='h-[50vh] max-h-[50vh]' />
          </TabsContent>
        </Tabs>
        <div className='flex gap-4'>
          <Button disabled={!prompt || !script}>
            <Play />
            Generate
          </Button>
          <Button
            disabled={!result}
            variant={'secondary'}
            size={'icon'}
            className='cursor-pointer'
            onClick={() => navigator.clipboard.writeText(result)}
          >
            <Copy />
          </Button>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
