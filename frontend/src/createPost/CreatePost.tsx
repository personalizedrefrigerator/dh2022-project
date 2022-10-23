import styled from "@emotion/styled";
import { TagData } from "../helper/types";
import useData from "../helper/useData";

export default function CreatePost() {
    const submit = async () => {
        const post = {
            title: (document.getElementById('title') as HTMLInputElement)?.value,
            userId: 1, // TODO: replace with real userId
            content: (document.getElementById('content') as HTMLTextAreaElement)?.value,
            tagId: 1 + Number((document.getElementById('tagName') as HTMLSelectElement)?.value)
        };

        // tagId = 0 is the 'select a tag' option, not a real tag
        if (Object.values(post).every((value) => value !== '') && post.tagId > 0) {
            await fetch('/posts', {
                method: 'post',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    title: post.title,
                    userId: post.userId,
                    content: post.content,
                    tagId: post.tagId,
                    createdDate: Date.now()
                })
            });

        } else
            console.log('Post object missing fields.')
    }

    return (
        <Container>
            <Form>
                <TitleInput
                    id="title"
                    type="text"
                    placeholder="Title..."
                />
                <TagInput id="tagName" defaultValue={'default'}>
                    <option hidden disabled value="default">-- select a tag --</option>
                    {useData<TagData>('/tags').map((tag, i) => {
                        return <option key={tag.tagId} value={i}>{tag.tagName}</option>
                    })}
                </TagInput>
                <ContentInput
                    id="content"
                    placeholder="Describe your idea in detail..."
                />
                <SubmitButton type="button" onClick={submit}>Post</SubmitButton>
            </Form>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 32px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    row-gap: 16px;
`;

const TitleInput = styled.input`
    width: 60%;
    font-size: 18px;
    font-weight: bold;
`;

const TagInput = styled.select`
    width: max-content;
`;

const ContentInput = styled.textarea`
    resize: none;
    height: 256px;
    padding: 8px;
`;

const SubmitButton = styled.button`
    width: fit-content;
    border: 1px solid navy;
    border-radius: 4px;
    background-color: navy;
    color: white;
    padding: 8px 16px;
    box-shadow: 0px 2px 2px var(--primary-shadow-color);

    :hover {
        background-color: white;
        color: navy;
        cursor: pointer;
    }
`;