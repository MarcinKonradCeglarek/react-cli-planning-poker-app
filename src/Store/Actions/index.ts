import { Actions, USER_VOTE, USER_RENAME, STORY_REVEAL, STORY_RESET } from './types';

export function UserVote(id: string, vote: number): Actions {
    return {
        type: USER_VOTE,
        id: id,
        vote: vote,
    };
}

export function UserRename(id: string, newName: string): Actions {
    return {
        type: USER_RENAME,
        id: id,
        newName: newName,
    };
}

export function RevealStory(): Actions {
    return {
        type: STORY_REVEAL,
        isRevealed: true,
    };
}

export function ResetStory(): Actions {
    return {
        type: STORY_RESET,
    };
}
