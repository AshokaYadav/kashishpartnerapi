// hooks/useGatewayManager.ts
import { useState } from 'react';
import { IGateway, GatewayErrors, DialogState, EHttpMethod } from '@/types/api';

const initialGatewayState: IGateway = {
    name: '',
    url: '',
    method: EHttpMethod.get,
    password: '',
    transactionPassword: '',
    isActive: true,
    disputeEmail: ''
};

export const useGatewayManager = () => {
    const [gateways, setGateways] = useState<IGateway[]>([]);
    const [editingGateway, setEditingGateway] = useState<IGateway | null>(null);
    const [newGateway, setNewGateway] = useState<IGateway>(initialGatewayState);
    const [dialogState, setDialogState] = useState<DialogState>({ add: false, update: false });
    const [errors, setErrors] = useState<GatewayErrors>({});

    const validateForm = (gateway: IGateway): GatewayErrors => {
        const newErrors: GatewayErrors = {};
        if (!gateway.name.trim()) newErrors.name = 'Name is required';
        if (!gateway.url.trim()) newErrors.url = 'URL is required';
        if (!gateway.method) newErrors.method = 'Method is required';
        if (!gateway.password) newErrors.password = 'Password is required';
        if (!gateway.transactionPassword) newErrors.transactionPassword = 'Transaction Password is required';
        return newErrors;
    };

    const handleAddGateway = () => {
        const formErrors = validateForm(newGateway);
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        const newId = Math.max(...gateways.map(item => item.id ?? 0), 0) + 1;
        setGateways([...gateways, { ...newGateway, id: newId }]);
        setDialogState({ ...dialogState, add: false });
        setNewGateway(initialGatewayState);
        setErrors({});
    };

    const handleUpdateGateway = () => {
        if (!editingGateway) return;

        setGateways(gateways.map(gateway =>
            gateway.id === editingGateway.id ? editingGateway : gateway
        ));
        setDialogState({ ...dialogState, update: false });
        setEditingGateway(null);
    };

    const handleStatusToggle = (id: number) => {
        setGateways(gateways.map(gateway =>
            gateway.id === id ? { ...gateway, isActive: !gateway.isActive } : gateway
        ));
    };

    return {
        gateways,
        setGateways,
        editingGateway,
        setEditingGateway,
        newGateway,
        setNewGateway,
        dialogState,
        setDialogState,
        errors,
        setErrors,
        handleAddGateway,
        handleUpdateGateway,
        handleStatusToggle,
        initialGatewayState
    };
};