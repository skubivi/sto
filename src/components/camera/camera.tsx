import { FC, useCallback, useEffect, useRef, useState } from "react";
import DefaultButton from "../ui/default-button/default-button";
import StyledModal from "../ui/styled-modal/styled-modal";

import PhotoSvg from '../../assets/components/camera/photo_camera.svg?react'
import BackSvg from '../../assets/pages/mechanic-main-page/arrow_back_ios.svg?react'

import styles from './style.module.scss'

interface ICamera {
    onUpload: (b: Blob) => void
    open: boolean
    onClose: () => void
}

const Camera: FC<ICamera> = (props) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const photoBlobRef = useRef<Blob | null>(null);

    const stopCamera = useCallback(() => {
        const s = streamRef.current;
        if (!s) return;

        s.getTracks().forEach((track) => {
            try {
                track.stop();
            } catch (e) {
                console.warn("Ошибка при остановке track:", e);
            }
        });

        streamRef.current = null;
        if (videoRef.current) {
            try {
                videoRef.current.pause();
                videoRef.current.srcObject = null;
            } catch (e) {
                console.warn("Ошибка при очистке video.srcObject:", e);
            }
        }
        console.log("Camera stopped, tracks should be stopped.");
    }, []);

    const startCamera = useCallback(async () => {
        stopCamera();

        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "environment" },
                audio: false,
            });

            streamRef.current = mediaStream;
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
                try {
                    await videoRef.current.play();
                } catch (e) {

                    console.warn("video.play() rejected:", e);
                }
            }
            console.log("Camera started, tracks:", mediaStream.getTracks().map(t => t.kind));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
            console.error("getUserMedia error:", e);
        }
    }, [stopCamera]);

    useEffect(() => {
        startCamera();
        return () => {
            stopCamera();

            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, []);

    const takePhoto = async () => {
        if (!videoRef.current || !canvasRef.current) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;

        const w = video.videoWidth || 1280;
        const h = video.videoHeight || 720;
        canvas.width = w;
        canvas.height = h;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
            return;
        }

        ctx.drawImage(video, 0, 0, w, h);

        canvas.toBlob(
            (blob) => {
                if (!blob) {
                    return;
                }
                photoBlobRef.current = blob;

                const url = URL.createObjectURL(blob);
                setPreviewUrl((prev) => {
                    if (prev) URL.revokeObjectURL(prev);
                    return url;
                });

                stopCamera();
            },
            "image/jpeg",
            0.9
        );
    };

    const retakePhoto = () => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
        }
        photoBlobRef.current = null;
        startCamera();
    };

    const uploadPhoto = async () => {
        const blob = photoBlobRef.current;
        if (!blob) {
            return;
        }

        props.onUpload(blob)
        props.onClose()
    };

    return (
        <StyledModal open={props.open} onClose={props.onClose}>
            <div className={styles.modal}>
                <div className={styles.back} onClick={props.onClose}>
                    <BackSvg />
                </div>
                <canvas ref={canvasRef} style={{ display: "none" }}/>
                {!previewUrl && 
                    <video ref={videoRef} autoPlay playsInline className={styles.video} />
                }
                {previewUrl &&
                    <img src={previewUrl} className={styles.photo} alt="preview" />
                }

                <div className={styles.buttons}>
                    {!previewUrl &&
                        <div className={styles['take-photo']} onClick={takePhoto}>
                            <PhotoSvg />
                        </div>
                    }
                    {previewUrl && (
                        <>
                            <DefaultButton onClick={uploadPhoto} variant="outline-primary">Отправить</DefaultButton>
                            <DefaultButton onClick={retakePhoto} variant="outline-secondary3">изменить фото</DefaultButton>
                        </>
                    )}
                </div>
            </div>
        </StyledModal>
    );
}

export default Camera