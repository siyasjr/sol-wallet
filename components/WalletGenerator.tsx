"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { generateMnemonic } from "@/lib/wallet-logic";

export function WalletGenerator() {
  const [mnemonic, setMnemonic] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [showPrivate, setShowPrivate] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    // TEMP: fake keys for now
    const {mnemonic, publicKey, privateKey } = await generateMnemonic();
    setMnemonic(mnemonic);
    setPublicKey(publicKey);
    setPrivateKey(privateKey);
  };

  const handleToggle = () => {
    setShowPrivate((prev) => !prev);
  };

  const handleCopy = () => {
      if (!mnemonic) return;
     navigator.clipboard.writeText(mnemonic).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 800); // reset after 1.5s
    });
  };

    const handleCopyPub = () => {
      if (!publicKey) return;
     navigator.clipboard.writeText(publicKey).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 800); // reset after 1.5s
    });
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Generate Wallet</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={handleGenerate}>Generate</Button>

{ mnemonic && (
       <div>
       
  <label className="text-sm font-medium">Mnemonic</label>

  
  <div className="grid grid-cols-4 gap-2 mt-1 cursor-pointer border p-2 rounded-lg hover:bg-gray-50" onClick={handleCopy} >
    {mnemonic.trim().split(/\s+/).map((word, index) => (
        <Input
          key={index}
          value={word}
          readOnly
          
          className="w-full !h-10 resize-none"
        />
      ))}
        
       {copied && (
        <span className="text-green-500 text-sm mt-1 block">
          ✅ Copied!
        </span>
      )}

       
  </div>

   
  
</div>
)}

        <div onClick={handleCopyPub}>
          <label className="text-sm font-medium">Public Key</label>
          <Input value={publicKey} readOnly className="mt-1" />
        </div>

        <div>
          <label className="text-sm font-medium flex justify-between items-center" onClick={handleCopy}>
            Private Key
            <Button variant="ghost" size="sm" onClick={handleToggle}>
              {showPrivate ? "Hide" : "Show"}
            </Button>
          </label>
          <Input
            type={showPrivate ? "text" : "password"}
            value={privateKey}
            readOnly
            className="mt-1"
          />
        </div>
      </CardContent>
    </Card>
  );
}
