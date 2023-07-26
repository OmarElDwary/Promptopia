"use client"
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Form from '@/components/Form'

const EditPrompt = () => {

  const searchParams = useSearchParams()

  const promptId = searchParams.get('id')
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [prompt, setPrompt] = useState({
    prompt: '',
    tag: '',
  })



  useEffect(() => {
    const getPromptDetails = async () => {
        const res = await fetch(`/api/prompt/${promptId}`)
        const data = await res.json()

        setPrompt({
            prompt: data.prompt,
            tag: data.tag,
        })
    }

    if(promptId) {
        getPromptDetails()
    }
  }, [promptId])
  const updatePrompt = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const res = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: prompt.prompt,
          tag: prompt.tag,
        }),
      })

      if(res.ok) {
        router.push('/')
      }

    } catch (error) {
      console.error(error)
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <Form 
      type="Edit"
      prompt={prompt}
      handleSubmit={updatePrompt}
      submitting={submitting}
      buttonText="Update Prompt"
      setPrompt={setPrompt}
      />
  )
}

export default EditPrompt
