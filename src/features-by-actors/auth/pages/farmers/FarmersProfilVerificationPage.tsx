import Button from '../../../../shared/components/atomes/Button'
import { RightArrowIcon, UserIcon } from '../../../../shared/components/icons'
import AccountCreationStepLayout from '../../layouts/AccountCreationStepLayout'
import { useNavigate } from 'react-router'
import { useAuth } from '../../stores/auth.store'
import { useState, useRef } from 'react'

const FarmersProfilVerificationPage = () => {
  const navigate = useNavigate()
  const { submitRegistration, setFile, isLoading, error } = useAuth()

  const [profilePreview, setProfilePreview] = useState<string | null>(null)
  const [localFiles, setLocalFiles] = useState<{
    profile: File | null;
    front: File | null;
    back: File | null;
  }>({ profile: null, front: null, back: null });

  const profileInputRef = useRef<HTMLInputElement>(null)
  const cniFrontInputRef = useRef<HTMLInputElement>(null)
  const cniBackInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, key: 'profile' | 'front' | 'back', previewSetter?: (url: string | null) => void) => {
    const file = e.target.files?.[0] || null
    setLocalFiles(prev => ({ ...prev, [key]: file }));

    if (key === 'profile') setFile('profilePhoto', file);
    else if (key === 'front') setFile('cniFront', file);
    else if (key === 'back') setFile('cniBack', file);

    if (file && previewSetter) {
      const reader = new FileReader()
      reader.onloadend = () => {
        previewSetter(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const submitProfilVerification = async () => {
    setLocalError(null)
    if (!localFiles.profile || !localFiles.front || !localFiles.back) {
      setLocalError("Veuillez uploader tous les documents requis.")
      return
    }

    const success = await submitRegistration();
    if (success) {
      navigate("/farmers/otp-code")
    }
  }

  const [localError, setLocalError] = useState<string | null>(null)

  return (
    <AccountCreationStepLayout actorType='farmer' step="profilVerification">
      <div className="max-w-[320px] w-full flex flex-col items-start gap-8">
        <div className="flex flex-col items-start gap-1 max-w-[283px]">
          <img src="/farmers/verification.svg" className="h-[84px]" alt="" />
          <div className="text-[24px] leading-[28px] text-cocoa">Profil & vérification</div>
          {(error || localError) && <div className="text-red text-[12px] mt-1">{error || localError}</div>}
        </div>
        <div className="flex flex-col gap-5 w-full">
          <div className="flex flex-col gap-2 items-start">
            <div className="text-[14px] leading-[20px] text-cocoa-40">Photo de profil</div>
            <input
              type="file"
              ref={profileInputRef}
              className="hidden"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'profile', setProfilePreview)}
            />
            <div
              onClick={() => profileInputRef.current?.click()}
              className="h-20 w-30 rounded-[8px] flex flex-col items-center justify-center cursor-pointer hover:bg-cocoa-10 bg-cocoa-5 duration-200 overflow-hidden"
            >
              {profilePreview ? (
                <img src={profilePreview} className="w-full h-full object-cover" alt="Profile preview" />
              ) : (
                <UserIcon className='h-9 w-9 fill-cocoa-20' />
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 items-start">
            <div className="text-[14px] leading-[20px] text-cocoa-40">Carte d’identité (CNI)</div>
            <div className="flex gap-3">
              <input
                type="file"
                ref={cniFrontInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'front')}
              />
              <div
                onClick={() => cniFrontInputRef.current?.click()}
                className={`h-20 w-30 rounded-[8px] flex flex-col items-center justify-center cursor-pointer hover:bg-cocoa-10 duration-200 ${localFiles.front ? 'bg-green/10' : 'bg-cocoa-5'}`}
              >
                <img src="/farmers/recto.png" alt="" />
                <div className="text-cocoa-30 text-[10px] leading-[20px]">
                  {localFiles.front ? <span className="text-green">C'est bon !</span> : <>Choisir le <span className="text-cocoa-50">recto</span></>}
                </div>
              </div>

              <input
                type="file"
                ref={cniBackInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'back')}
              />
              <div
                onClick={() => cniBackInputRef.current?.click()}
                className={`h-20 w-30 rounded-[8px] flex flex-col items-center justify-center cursor-pointer hover:bg-cocoa-10 duration-200 ${localFiles.back ? 'bg-green/10' : 'bg-cocoa-5'}`}
              >
                <img src="/farmers/verso.png" alt="" />
                <div className="text-cocoa-30 text-[10px] leading-[20px]">
                  {localFiles.back ? <span className="text-green">C'est bon !</span> : <>Choisir le <span className="text-cocoa-50">verso</span></>}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-end">
          <Button disabled={isLoading} onClick={() => submitProfilVerification()} className="px-3 flex-0 text-nowrap" endIcon={<RightArrowIcon className="fill-white" />}>
            {isLoading ? "Envoi..." : "Créer votre compte"}
          </Button>
        </div>
      </div>
    </AccountCreationStepLayout>
  )
}

export default FarmersProfilVerificationPage