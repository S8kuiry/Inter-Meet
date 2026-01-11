// mutation is used for the create delete and update 
// query is used for fetching purposes
// imported from @tanstack/react-query
// the result here can be destructured
import { useMutation, useQuery } from '@tanstack/react-query'
import { sessionApi } from '../api/sessions'
import { toast } from 'react-toastify'

export const useCreateSession = () => {
    const result = useMutation({
        mutationFn: sessionApi.createSession,
        onSuccess: () => {
            toast.success("Session Created Successfully!")
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to Create Session")
        }

    })
    return result
}

export const useActiveSessions = () => {
    const result = useQuery({
        queryKey: ['activeSessions'],
        queryFn: sessionApi.getActiveSessions,
        refetchInterval:1000,
        refetchIntervalInBackground:true
    })
    return result
}

export const useMyRecentSessions = () => {
    const result = useQuery({
        queryKey: ["myRecentSessions"],
        queryFn: sessionApi.getMyRecentSessions,
       refetchInterval:1000,
        refetchIntervalInBackground:true
    })
    return result
}


export const useSessionById = (id) => {
    const result = useQuery({
        queryKey: [`session`, id],
        queryFn: () => sessionApi.getSessionById(id),
        enabled: !!id,
        refetchInterval: 5000,//refetch ebery 5 secs

    })
    return result
}


export const useJoinSession = () => {
    const result = useMutation({
        mutationKey: ['joinSession'],
        mutationFn:  sessionApi.joinSession,
        onSuccess: () => toast.success("Joined Session Successfully!"),
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to Join Session")
        }
    })
    return result
}

export const useEndSession = () => {
    const result = useMutation({
        mutationKey: ['endSession'],
        mutationFn:  sessionApi.endSession,
        onSuccess: () => toast.success("Session Ended Successfully!"),
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to End Session")
        }
    })

}