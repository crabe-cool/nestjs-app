import { AnswerThreadCommand } from '../application/commands/answer-thread.handler';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { MessageReceivedEvent } from './message-received.event';
import { PostThreadCommand } from '../application/commands/post-thread.handler';
import { ThreadReceivedEvent } from './thread-received.event';

@Injectable()
export class ThreadSagas {
    @Saga()
    threadReceived = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(ThreadReceivedEvent),
            map(
                (event: ThreadReceivedEvent) =>
                    new PostThreadCommand(event.thread),
            ),
        );
    };

    @Saga()
    messageReceived = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(MessageReceivedEvent),
            map(
                (event: MessageReceivedEvent) =>
                    new AnswerThreadCommand(event.threadId, event.message),
            ),
        );
    };
}
