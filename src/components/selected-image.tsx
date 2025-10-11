import Image from "next/image";
import {Button} from "@/components/ui/button";
import {X} from "lucide-react";

export const SelectedImage = ({imageUrl, setSelectedImageUrl}: {imageUrl: string, setSelectedImageUrl: (url: string | null) => void})  => {

    const onClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedImageUrl(null);
    }

    return (
        <div key={imageUrl} className={'absolute top-0 left-0 w-screen h-screen flex justify-center items-center z-60'} onClick={onClose}>
            {/* Semi-transparent black background */}
            <div className={'absolute top-0 left-0 w-full h-full bg-black opacity-70'} />

            {/* Close button */}
            <Button className={'absolute top-4 right-4 bg-red-500 opacity-70 border-red-600 hover:cursor-pointer hover:bg-red-400 hover:border-red-500 z-[61]'} onClick={onClose}>
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
            </Button>

            <div className="relative w-full h-full p-4 flex justify-center items-center select-none pointer-events-none">
                <Image
                    src={imageUrl}
                    alt="Selected"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg select-none pointer-events-none"
                />
            </div>
        </div>
    )
}