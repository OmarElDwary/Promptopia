import Link from "next/link"

const Form = ({ type, prompt, handleSubmit, submitting, buttonText, setPrompt }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text_left"><span className="blue_gradient">{type} Prompt</span></h1>
      <p className="desc text-left max-w-md">{type} a prompt to share with Others.</p>
      <form 
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
          <label className="font-satoshi font-semibold text-base text-gray-700">
            Your Prompt
          <textarea
            value={prompt.prompt}
            onChange={(e) => setPrompt({ ...prompt, prompt: e.target.value })}
            placeholder="What's your prompt?" required
            className="form_textarea"
          />
          </label>
          <label className="font-satoshi font-semibold text-base text-gray-700">
            Tag
          <input
            value={prompt.tag}
            onChange={(e) => setPrompt({ ...prompt, tag: e.target.value })}
            placeholder="Tag your prompt" required
            className="form_input"
          />
          </label>
          <div className="flex flex-end mb-5 gap-4">
            <Link href='/' className="text-gray-500 text-sm">
              Cancel
            </Link>
          <button
            type="submit"
            disabled={submitting}
            className="form_button px-5 py-1.5 bg-blue-500 text-white font-semibold rounded-md"
          >
            {submitting ? 'Submitting...' : buttonText}
          </button>
          </div>
      </form>

    </section>
  )
}

export default Form
