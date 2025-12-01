'use client'
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, Loader2 } from 'lucide-react';
import { GraduationCap, Users, UserCircle } from 'lucide-react';
const roles = [
  { id: 'student' as const, label: 'Student', icon: GraduationCap },
  { id: 'teacher' as const, label: 'Teacher', icon: UserCircle },
  { id: 'parent' as const, label: 'Parent', icon: Users }
];

const departments = [
  { value: 'cs', label: 'CSE' },
  { value: 'ec', label: 'ECE' },
  { value: 'it', label: 'IT' }
];

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher' | 'parent'>('student');
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', gender: '', password: '', confirmPassword: '',
    admissionNumber: '', admissionYear: '', candidateCode: '', department: '', dateOfBirth: '',
    relation: '', designation: '', dateOfJoining: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim() || formData.firstName.length < 2) 
      newErrors.firstName = 'First name must be at least 2 characters';
    if (!formData.lastName.trim() || formData.lastName.length < 2) 
      newErrors.lastName = 'Last name must be at least 2 characters';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) 
      newErrors.email = 'Invalid email address';
    if (!formData.phone.trim() || formData.phone.length < 10) 
      newErrors.phone = 'Phone number must be at least 10 digits';
    if (!formData.gender) newErrors.gender = 'Please select a gender';
    if (!formData.password || formData.password.length < 8) 
      newErrors.password = 'Password must be at least 8 characters';
    if (!formData.confirmPassword || formData.password !== formData.confirmPassword) 
      newErrors.confirmPassword = "Passwords don't match";

    if (selectedRole === 'student') {
      if (!formData.admissionNumber.trim()) newErrors.admissionNumber = 'Required';
      if (!formData.admissionYear.trim()) newErrors.admissionYear = 'Required';
      if (!formData.candidateCode.trim()) newErrors.candidateCode = 'Required';
      if (!formData.department) newErrors.department = 'Required';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Required';
    } else if (selectedRole === 'parent') {
      if (!formData.relation) newErrors.relation = 'Required';
    } else if (selectedRole === 'teacher') {
      if (!formData.designation.trim()) newErrors.designation = 'Required';
      if (!formData.department) newErrors.department = 'Required';
      if (!formData.dateOfJoining) newErrors.dateOfJoining = 'Required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      setError('Please fix the errors in the form');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      console.log('Form submitted:', { ...formData, role: selectedRole });
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Account created successfully!');
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Google sign-up initiated!');
    } catch (err: any) {
      setError(err.message || 'An error occurred during Google sign up');
    } finally {
      setIsLoading(false);
    }
  };

  const FormField = ({ id, label, type = 'text', placeholder, value, error }: any) => (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} placeholder={placeholder} value={value}
        onChange={(e) => handleInputChange(id, e.target.value)} />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );

  const SelectField = ({ id, label, value, error, options, placeholder }: any) => (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Select value={value} onValueChange={(val: string) => handleInputChange(id, val)}>
        <SelectTrigger><SelectValue placeholder={placeholder} /></SelectTrigger>
        <SelectContent position="popper" sideOffset={5}>
          {options.map((opt: any) => (
            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );

  return (
    <div className="relative flex min-h-screen flex-col md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* Left Side - Background Image */}
      <div className="relative flex h-[45vh] flex-col overflow-hidden bg-muted p-6 text-white lg:h-full lg:p-10 dark:border-r">
        <div 
          className="absolute inset-0 bg-cover bg-center scale-110 lg:scale-100 " 
          style={{ backgroundImage: "url('/ucek.jpeg')" }} 
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <img src="/logo.svg" alt="Logo" className="mr-2 h-10 w-auto lg:h-14 text-white invert" />
        </div>
        <div className="relative z-20 mt-auto hidden lg:block">
          <blockquote className="leading-normal text-balance">
            &ldquo;This library has saved me countless hours of work and
            helped me deliver stunning designs to my clients faster than ever
            before.&rdquo; - Sofia Davis
          </blockquote>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex w-full flex-1 items-center justify-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center gap-6 sm:w-[450px] overflow-y-auto">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">AMS</h1>
            <p className="text-muted-foreground text-sm">Create your account by selecting your role</p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selection */}
            <div className="space-y-2">
              <Label>Select Role</Label>
              <div className="grid grid-cols-3 gap-2">
                {roles.map((role) => (
                  <button key={role.id} type="button" onClick={() => { setSelectedRole(role.id); setErrors({}); }}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                      selectedRole === role.id ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'
                    }`}>
                    <role.icon className="h-6 w-6 mb-1" />
                    <span className="text-xs font-medium">{role.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Common Fields */}
            <div className="grid grid-cols-2 gap-3">
              <FormField id="firstName" label="First Name" placeholder="John" value={formData.firstName} error={errors.firstName} />
              <FormField id="lastName" label="Last Name" placeholder="Doe" value={formData.lastName} error={errors.lastName} />
            </div>
            <FormField id="email" label="Email" type="email" placeholder="mail@example.com" value={formData.email} error={errors.email} />
            <FormField id="phone" label="Phone Number" type="tel" placeholder="+91 98765 43210" value={formData.phone} error={errors.phone} />
            <SelectField id="gender" label="Gender" value={formData.gender} error={errors.gender} placeholder="Select gender"
              options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }, { value: 'other', label: 'Other' }]} />

            {/* Role-Specific Fields */}
            {selectedRole === 'student' && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <FormField id="admissionNumber" label="Admission No." placeholder="29CSE555" value={formData.admissionNumber} error={errors.admissionNumber} />
                  <FormField id="admissionYear" label="Admission Year" type="number" placeholder="2026" value={formData.admissionYear} error={errors.admissionYear} />
                </div>
                <FormField id="candidateCode" label="Candidate Code" placeholder="41529505078" value={formData.candidateCode} error={errors.candidateCode} />
                <SelectField id="department" label="Department" value={formData.department} error={errors.department} placeholder="Select department" options={departments} />
                <FormField id="dateOfBirth" label="Date of Birth" type="date" value={formData.dateOfBirth} error={errors.dateOfBirth} />
              </>
            )}

            {selectedRole === 'parent' && (
              <SelectField id="relation" label="Relation" value={formData.relation} error={errors.relation} placeholder="Select relation"
                options={[{ value: 'father', label: 'Father' }, { value: 'mother', label: 'Mother' }, { value: 'guardian', label: 'Guardian' }]} />
            )}

            {selectedRole === 'teacher' && (
              <>
                <FormField id="designation" label="Designation" placeholder="Assistant Professor" value={formData.designation} error={errors.designation} />
                <SelectField id="department" label="Department" value={formData.department} error={errors.department} placeholder="Select department"
                  options={[{ value: 'cs', label: 'Computer Science' }, { value: 'ec', label: 'Electronics' }, { value: 'me', label: 'Mechanical' }, { value: 'ce', label: 'Civil' }]} />
                <FormField id="dateOfJoining" label="Date of Joining" type="date" value={formData.dateOfJoining} error={errors.dateOfJoining} />
              </>
            )}

            <FormField id="password" label="Password" type="password" placeholder="••••••••" value={formData.password} error={errors.password} />
            <FormField id="confirmPassword" label="Confirm Password" type="password" placeholder="••••••••" value={formData.confirmPassword} error={errors.confirmPassword} />

            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Account
            </Button>
          </form>

          

          <p className="px-6 text-center text-xs text-muted-foreground">
            Already have an account?{" "}
            <a href="/signin" className="underline underline-offset-4 hover:text-primary">
              Sign in
            </a>
          </p>

          <p className="px-6 text-center text-xs text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <a href="/terms" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}