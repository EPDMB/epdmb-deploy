export enum StatusProductRequest {
        PENDING = 'pending',
        ACCEPTED = 'accepted',
        REJECTED = 'rejected',
        CHECKED = 'checked',
    }
    
export const StatusProductRequestDescription = {
        [StatusProductRequest.PENDING]: 'Pendiente',
        [StatusProductRequest.ACCEPTED]: 'Aprobado',
        [StatusProductRequest.REJECTED]: 'Rechazado',
        [StatusProductRequest.CHECKED]: 'Verificado',
    };