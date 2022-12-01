import { Message } from './message';
import { Thread } from './thread';

describe('Thread', () => {
    it('should create a new thread with given props', () => {
        const author = 'author';
        const postingDate = new Date();
        const text = 'text';
        const title = 'title';

        const thread = new Thread(author, postingDate, text, title);

        expect(thread.author).toBe(author);
        expect(thread.postingDate).toBe(postingDate);
        expect(thread.text).toBe(text);
        expect(thread.title).toBe(title);
    });

    it('should add a message to thread messages when answering the thread', () => {
        const thread = new Thread('author', new Date(), 'text', 'title');

        const message = new Message('author', new Date(), 'text');

        thread.answer(message);

        expect(thread.messages).toContain(message);
    });

    it('should set thread id to given id', () => {
        const thread = new Thread('author', new Date(), 'text', 'title');

        const id = 'id';

        thread.assignId(id);

        expect(thread.id).toBe(id);
    });
});
