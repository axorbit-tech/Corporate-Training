import React from "react";
import type { ReactNode } from "react";
import { Box, Button, Modal, Typography, CircularProgress } from "@mui/material";

type ModalSize = {
    width?: number | string;
    height?: number | string;
};

interface CustomModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    size?: ModalSize;
    color?: string;
    buttonText?: string;
    onButtonClick?: () => void;
    children?: ReactNode;
    loading?: boolean;
}

const CustomModal: React.FC<CustomModalProps> = ({
    open,
    onClose,
    title,
    description = "",
    size = { width: 400, height: "auto" },
    color = "#fff",
    buttonText,
    onButtonClick,
    children,
    loading = false,
}) => {
    const style = {
        position: "absolute" as const,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: color,
        p: 4,
        borderRadius: 2,
        width: size.width,
        height: size.height,
    };

    return (
        <Modal className="text-center" open={open} onClose={onClose} aria-labelledby="custom-modal-title" >
            <Box sx={style}>
                {title && (
                    <Typography id="custom-modal-title" variant="h6" component="h2">
                        {title}
                    </Typography>
                )}
                {description && <Typography sx={{ mt: 2 }}>{description}</Typography>}

                {children && <Box sx={{ mt: 2 }}>{children}</Box>}


                <div className="flex justify-center mt-4 gap-4">
                    {loading ? (
                        <CircularProgress size="30px" />
                    ) : (
                        <>
                            {/* Cancel Button */}
                            <Button
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    backgroundColor: "#dc2626",
                                    "&:hover": { backgroundColor: "#b91c1c" },
                                }}
                                onClick={onClose}
                            >
                                Cancel
                            </Button>

                            {/* Confirm Button */}
                            {buttonText && (
                                <Button
                                    variant="contained"
                                    sx={{ mt: 3 }}
                                    onClick={onButtonClick || onClose}

                                >
                                    {buttonText}
                                </Button>
                            )}
                        </>
                    )}
                </div>
            </Box>
        </Modal>
    );
};

export default CustomModal;
