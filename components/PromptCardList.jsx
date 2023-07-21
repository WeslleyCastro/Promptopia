import PromptCard from "./PromptCard"
const PromptCardList = ({ data }) => {
  return(
   <div className="mt-16 prompt_layout">
      {data.map((prompt) => (
          <PromptCard
            key={prompt._id}
            post={prompt}
          />
      ))}
    </div>
  )
}
export default PromptCardList