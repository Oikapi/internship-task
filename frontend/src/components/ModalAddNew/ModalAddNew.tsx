import { Box, Modal } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { FormValues, Product } from "../../types/CommonTypes";
import { bodyHandler } from "./constants";
import "./modalAddNew.css";

interface ModalAddNewProps {
    isModalOpen: boolean;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    modalInfo: Product;
    onAddNew: (body: Product) => void;
    onEdit: (body: Product) => void;
}

function ModalAddNew({
    isModalOpen,
    setModalOpen,
    modalInfo,
    onAddNew,
    onEdit,
}: ModalAddNewProps) {
    const {
        control,
        handleSubmit,
        formState: { errors },
        trigger,
    } = useForm<FormValues>({ shouldUnregister: true });
    const submitHandler: SubmitHandler<FormValues> = (data) => {
        const body = bodyHandler(data, modalInfo?.id || null);
        modalInfo?.id ? onEdit(body) : onAddNew(body);
        setModalOpen(false);
        // onSubmit(body)
    };
    const validateName = (value: string) => {
        return value.trim() !== "" || "Поле не может состоять только из пробелов.";
    };
    return (
        <>
            <Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
                <Box className="Modal-Add-New">
                    <form
                        className="Modal-Table-form"
                        onSubmit={handleSubmit(submitHandler)}
                    >
                        <div>
                            <label>Name</label>
                            <div className="input-required">
                                <Controller
                                    defaultValue={modalInfo?.name}
                                    name="name"
                                    control={control}
                                    rules={{
                                        required: "Поле не может быть пустым.",
                                        validate: validateName,
                                    }}
                                    render={({ field }) => (
                                        <>
                                            <input
                                                {...field}
                                                type="text"
                                                id="name"
                                                onBlur={() => trigger("name")}
                                            />
                                            <span>&middot; Required</span>
                                        </>
                                    )}
                                />
                                {errors.name && <p>{errors.name.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label>Supplied email:</label>
                            <div className="input-required">
                                <Controller
                                    defaultValue={modalInfo?.email}
                                    name="email"
                                    control={control}
                                    rules={{
                                        required: "Поле не может быть пустым.",
                                        pattern: {
                                            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                            message: "Некорректный формат email.",
                                        },
                                    }}
                                    render={({ field }) => (
                                        <>
                                            <input
                                                {...field}
                                                type="text"
                                                id="email"
                                                onBlur={() => trigger("email")}
                                            />
                                            <span>&middot; Required</span>
                                        </>
                                    )}
                                />
                                {errors.email && <p>{errors.email.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label>Count:</label>
                            <Controller
                                defaultValue={modalInfo?.count?.toString()}
                                name="count"
                                control={control}
                                rules={{ required: "Поле не может быть пустым." }}
                                render={({ field }) => (
                                    <>
                                        <input
                                            {...field}
                                            type="number"
                                            id="count"
                                            onBlur={() => trigger("count")}
                                        />
                                    </>
                                )}
                            />
                            {errors.count && <p>{errors.count.message}</p>}
                        </div>

                        <div>
                            <label>Price:</label>
                            <Controller
                                defaultValue={modalInfo?.price?.toString()}
                                name="price"
                                control={control}
                                rules={{ required: "Поле не может быть пустым." }}
                                render={({ field }) => (
                                    <>
                                        <NumericFormat
                                            {...field}
                                            thousandSeparator
                                            prefix="$"
                                            allowNegative={false}
                                            onBlur={() => trigger("price")}
                                        />
                                    </>
                                )}
                            />
                            {errors.price && <p>{errors.price.message}</p>}
                        </div>

                        <button className="btn" type="submit">
                            Add/Update
                        </button>
                    </form>
                </Box>
            </Modal>
        </>
    );
}

export default ModalAddNew;
