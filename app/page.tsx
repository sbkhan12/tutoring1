"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, ChevronRight, ChevronLeft, Facebook, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"

// Topic categories data
const topicCategories = [
  { name: "Science", subtext: "Physics", icon: "/comp.png" },
  { name: "Math", subtext: "Algebra", icon: "/math.png" },
  { name: "English", subtext: "Literature", icon: "/comp.png" },
  { name: "History", subtext: "World", icon: "/comp.png" },
  { name: "Languages", subtext: "Spanish", icon: "/comp.png" },
  { name: "Arts", subtext: "Music", icon: "/phy.png" },
  { name: "Computer", subtext: "Programming", icon: "/comp.png" },
]

// Testimonial data
const testimonials = [
  {
    id: 1,
    text: "Ever since I started using Tutoring Anything, my grades have improved significantly. I was struggling with my Math class, but now I feel confident in my abilities and got an A on my semester!",
    initials: "JD",
    color: "bg-red-500",
    rating: 4.8,
  },
  {
    id: 2,
    text: "The tutors at Tutoring Anything are exceptional. They're patient, knowledgeable, and really care about helping you understand the material. I've recommended them to all my friends!",
    initials: "KL",
    color: "bg-green-500",
    rating: 4.9,
  },
  {
    id: 3,
    text: "I was hesitant to try online tutoring, but Tutoring Anything made the experience seamless. The platform is easy to use, and I was able to find a tutor who matched my learning style perfectly.",
    initials: "MN",
    color: "bg-blue-500",
    rating: 4.7,
  },
]

// Benefit slides data
const benefitSlides = [
  {
    id: 1,
    title: "STUDENTS",
    heading: "Tutoring Anything provides unmatched resources for students",
    content: [
      "Finding the right tutor can be a challenge for students looking to improve their academic performance. At Tutoring Anything, we have created a platform that makes it easy to connect with qualified tutors who specialize in the subjects you need help with.",
      "Our tutors are available for one-on-one sessions, group study, and even emergency homework help. Whether you're struggling with a specific concept or preparing for an important exam, we have the resources you need to succeed.",
    ],
    image: "/layer 9.jpg",
  },
  {
    id: 2,
    title: "TUTORS",
    heading: "Join our network of professional educators",
    content: [
      "As a tutor on our platform, you'll have the opportunity to connect with students who are eager to learn and benefit from your expertise. Our flexible scheduling allows you to teach when it's convenient for you.",
      "We provide all the tools you need to deliver effective online tutoring sessions, including virtual whiteboards, file sharing, and video conferencing. Join our community of educators making a difference in students' lives.",
    ],
    image: "/layer 9.jpg",
  },
  {
    id: 3,
    title: "PARENTS",
    heading: "Support your child's educational journey",
    content: [
      "Parents play a crucial role in their children's education. Our platform makes it easy to find qualified tutors who can provide the additional support your child needs to excel academically.",
      "You can monitor your child's progress, communicate directly with tutors, and schedule sessions that fit your family's busy schedule. Invest in your child's future with Tutoring Anything.",
    ],
    image: "/layer 9.jpg",
  },
]

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showAllCategories, setShowAllCategories] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle search functionality
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      toast({
        title: "Search initiated",
        description: `Searching for "${searchQuery}"`,
      })
      // In a real app, you would redirect to search results page or fetch results
    }
  }

  // Handle newsletter subscription
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our newsletter",
      })
      setEmail("")
      setIsSubmitting(false)
    }, 1000)
  }

  // Carousel navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === benefitSlides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? benefitSlides.length - 1 : prev - 1))
  }

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentSlide])

  // Display categories based on toggle
  const displayedCategories = showAllCategories ? topicCategories : topicCategories.slice(0, 7)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container mx-auto flex h-20 items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <Image
            src="/bglogo.png?height=200&width=300"
            alt="Tutoring Anything Logo"
            width={150}
            height={200}
            className="h-15 w-25"
          />
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="#" className="text-sm font-medium text-gray-700 hover:text-blue-700">
            Home
          </Link>
          <Link href="#" className="text-sm font-medium text-gray-700 hover:text-blue-700">
            About
          </Link>
          <Link href="#" className="text-sm font-medium text-gray-700 hover:text-blue-700">
            Partners
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-blue-700">
            Login
          </Link>
          <Button size="sm" className="bg-blue-300 text-black hover:bg-blue-400">
            Get Started
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-blue-100 py-16 overflow-hidden w-full max-w-7xl mx-auto rounded-2xl">
          {/* Background blobs */}
          <div className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full bg-blue-200 -translate-x-1/2 -translate-y-1/2 opacity-70"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-blue-100/30 -translate-x-1/2 translate-y-1/2"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                    Learn from{" "}
                    <span className="relative">
                      <span className="relative z-10 text-blue-300">anywhere</span>
                      <span className="absolute bottom-0 left-0 w-full h-3 bg-blue-100 -z-10"></span>
                    </span>{" "}
                    around the globe with us
                  </h1>
                  <p className="text-gray-600 text-lg max-w-md">
                    Get access to high-quality education from anywhere in the world. Connect with expert tutors and learn at your own pace.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex w-full max-w-md items-center space-x-2 rounded-full bg-white border border-gray-200 p-1 shadow-sm">
                    <Search className="ml-3 h-5 w-5 shrink-0 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="What do you want to learn?"
                      className="flex-1 border-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-full"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button 
                      type="submit" 
                      className="rounded-full bg-blue-300 hover:bg-blue-700 text-black px-6"
                      onClick={(e) => {
                        e.preventDefault()
                        handleSearch(e)
                      }}
                    >
                      Search
                    </Button>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button className="rounded-full bg-blue-300 hover:bg-blue-700 text-black px-8">
                      Get Started
                    </Button>
 
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs ring-2 ring-white">
                      JD
                    </div>
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs ring-2 ring-white">
                      KL
                    </div>
                    <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs ring-2 ring-white">
                      MN
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">10k+</span> students joined us
                  </div>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="layer 4.png"
                  alt="Tutor with laptop"
                  width={600}
                  height={600}
                  className="w-full h-auto object-contain"
                  priority
                />
                <div className="absolute top-4 right-4 bg-white rounded-xl p-3 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium text-gray-700">Live Classes</span>
                  </div>
                </div>
                <div className="absolute bottom-8 left-0 bg-white rounded-xl p-3 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-1">
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs ring-2 ring-white">
                        8k
                      </div>
                    </div>
                    <div className="text-xs">
                      <div className="font-medium text-gray-900">Active Students</div>
                      <div className="text-gray-500">Learning now</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* How Are We Different Section */}
        <section className="py-16 w-full max-w-7xl mx-auto">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="inline-block rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary">
                  ABOUT US
                </div>
                <h2 className="text-3xl font-bold text-gray-800">
                  How Are We <span className="text-primary">Different</span> <br />
                  from <span className="text-primary">others?</span>
                </h2>
                <p className="text-gray-600 max-w-md">
                  Unlike so many other tutoring services, tutoring itself is at the forefront of subjects we offer as
                  well as our focus on all educational levels, including higher level education. Whether you need help
                  with elementary, middle, or high school test preparation, or any other subject, we have you covered.
                </p>
                <p className="text-gray-600 max-w-md">
                  At Tutoring Anything, we take pride in the quality of our tutors. Each member of our team undergoes a
                  rigorous screening process to ensure they possess the necessary qualifications and teaching skills
                  needed to help you succeed. With a diverse range of expertise, our tutors can assist with virtually
                  any subject.
                </p>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  Read More
                </Button>
              </div>
              <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-px">
  {/* First Image */}
  <div className="relative">
    <Image
      src="/lay62.jpg?height=300&width=100"
      alt="Tutor"
      width={400}
      height={500}
      className="mx-auto rounded-lg"
    />
    <div className="absolute top-4 right-4  rounded-lg p-2 shadow-md">
      {/* <div className="text-primary font-bold">110k</div> */}
      {/* <div className="text-xs text-gray-500">Active Students</div> */}
    </div>
    <div className="absolute bottom-4 left-4 bg-white rounded-lg p-2 shadow-md">
      <div className="text-primary font-bold">100+</div>
      <div className="text-xs text-gray-500">Top Class Tutors</div>
      <div className="flex gap-1 mt-1">
        <span className="text-xs bg-yellow-400 px-1 rounded">SMES</span>
      </div>
    </div>
  </div>

  {/* Duplicate Image */}
  <div className="relative">
    <Image
      src="/lay6.jpg?height=100&width=100"
      alt="Tutor"
      width={400}
      height={500}
      className="mx-auto rounded-lg"
    />
    <div className="absolute top-4 right-4 bg-white rounded-lg p-2 shadow-md">
      <div className="text-primary font-bold">110k</div>
      <div className="text-xs text-gray-500">Active Students</div>
    </div>
    <div className="absolute bottom-4 left-4 rounded-lg p-2 shadow-md">
      {/* <div className="text-primary font-bold">100+</div> */}
      {/* <div className="text-xs text-gray-500">Top Class Tutors</div> */}
      <div className="flex gap-1 mt-1">
        {/* <span className="text-xs bg-yellow-400 px-1 rounded">SMES</span> */}
      </div>
    </div>
  </div>
</div>
            </div>
          </div>
        </section>

        {/* Find Topic Section */}
        <section className="bg-blue-100 py-16 w-full max-w-7xl mx-auto">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800">
                Find the topic that <span className="text-primary">interests</span> you
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 max-w-5xl mx-auto">
              {displayedCategories.map((topic, i) => (
                <div
                  key={i}
                  className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center justify-center hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() =>
                    toast({
                      title: `${topic.name} selected`,
                      description: `Exploring ${topic.subtext} tutoring options`,
                    })
                  }
                >
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-2">
                    <Image src={topic.icon || "/placeholder.svg"} alt={`${topic.name} icon`} width={30} height={30} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{topic.name}</span>
                  <span className="text-xs text-gray-500">{topic.subtext}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Button
                variant="outline"
                className="bg-blue-300 text-white hover:bg-blue-400"
                onClick={() => setShowAllCategories(!showAllCategories)}
              >
                {showAllCategories ? "SHOW LESS" : "ALL CATEGORIES"}
              </Button>
            </div>
          </div>
        </section>

        {/* Join Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-6">
              <div className="inline-block rounded-full bg-blue-400 px-3 py-1 text-xs font-medium text-white mb-2">
                BENEFITS
              </div>
              <h2 className="text-3xl font-bold text-gray-800">
                Join <span className="text-blue-400">Tutoring</span> Anything
              </h2>
              <p className="text-gray-600">Students and tutors</p>
            </div>

            <div className="relative max-w-5xl mx-auto mt-10">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {benefitSlides.map((slide) => (
                    <div key={slide.id} className="min-w-full p-4">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-lg overflow-hidden shadow-md">
                          <Image
                            src={slide.image || "/layer 9.jpg"}
                            alt="Students learning"
                            width={500}
                            height={300}
                            className="w-full h-48 object-cover"
                          />
                        </div>
                        <div className="bg-blue-300 rounded-lg p-6 text-white">
                          <div className="inline-block rounded-full bg-blue-500 px-3 py-1 text-xs font-medium mb-4">
                            {slide.title}
                          </div>
                          <h3 className="text-xl font-bold mb-4">{slide.heading}</h3>
                          {slide.content.map((paragraph, idx) => (
                            <p key={idx} className="text-sm mb-4">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center z-10"
                onClick={prevSlide}
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-6 w-6 text-blue-700" />
              </button>
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center z-10"
                onClick={nextSlide}
                aria-label="Next slide"
              >
                <ChevronRight className="h-6 w-6 text-blue-700" />
              </button>

              <div className="flex justify-center mt-6 gap-2">
                {benefitSlides.map((_, idx) => (
                  <button
                    key={idx}
                    className={`w-2 h-2 rounded-full ${currentSlide === idx ? "bg-blue-700" : "bg-gray-300"}`}
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section className="py-16 bg-gray-50 w-full max-w-7xl mx-auto">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative">
                <div className="absolute inset-7 bg-blue-100 rounded-full transform scale-125"></div>
                <div className="relative space-y-6 p-6">
                  <div className="inline-block rounded-full bg-blue-300 px-3 py-1 text-xs font-medium text-white">
                    ABOUT OUR
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800">Founder</h2>
                  <p className="text-gray-600 max-w-md">
                    Dr. Kathryn Smith, Ph.D. is a dedicated educator with a deep commitment to making quality education
                    accessible to all students. With over 15 years of experience in the field of education, she gives us
                    with a profound appreciation for the power of education to transform lives. Her dedication to
                    fostering knowledge is rooted in her fundamental belief that education is the key to unlocking
                    potential.
                  </p>
                  <p className="text-gray-600 max-w-md">
                    Dr. Smith is the author of textbook that serves as a primary text for university education, which is
                    testament to her depth of expertise and her dedication to the field. She has received numerous
                    awards for her innovative teaching methods, her accessible and practical knowledge, leading her
                    recognition as a thought leader in her field.
                  </p>
                  <Button variant="outline" className="border-blue-700 text-blue-700 hover:bg-blue-50">
                    Read More
                  </Button>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/founder.jpg?height=500&width=400"
                  alt="Founder"
                  width={400}
                  height={500}
                  className="mx-auto rounded-lg"
                />
                <div className="absolute top-4 right-4 bg-white rounded-lg p-2 shadow-md">
                  <div className="text-blue-700 font-bold">110k+</div>
                </div>
                <div className="absolute bottom-16 left-0 bg-white rounded-lg p-2 shadow-md flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                      JD
                    </div>
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">
                      KL
                    </div>
                  </div>
                  <div className="text-blue-700 font-bold">8k</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <div className="inline-block rounded-full bg-blue-400 px-3 py-1 text-xs font-medium text-white mb-2">
                STUDENT TESTIMONIALS
              </div>
              <h2 className="text-3xl font-bold text-gray-800">
                See what our <span className="text-blue-400">lovely</span> <br />
                <span className="text-blue-400">student</span> say about us
              </h2>
              <p className="text-gray-600 mt-2">
                Finding a tutor is like matchmaking, with us help you find the perfect fit.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start mb-4">
                    <div className="text-4xl text-red-500 mr-2">"</div>
                    <p className="text-gray-700">{testimonial.text}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-full ${testimonial.color} flex items-center justify-center text-white text-xs`}
                      >
                        {testimonial.initials}
                      </div>
                      <div>
                        <div className="text-sm font-medium">Rating for hiring</div>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <div key={j} className="text-yellow-500">
                              ★
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-xl font-bold text-gray-400">{testimonial.rating}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="bg-gray-400 py-12 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Sign up for our Newsletter</h2>
              <p className="text-white-100 max-w-md mx-auto">
                Contains qualified privileged information specific student placement, email questions regularly
                answered.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex gap-2 text-white-100">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-700 border-gary-600 text-white placeholder:text-gray-300 focus-visible:ring-gray-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="bg-gray-600 hover:bg-blue-700 text-white" disabled={isSubmitting}>
                {isSubmitting ? "SENDING..." : "SUBMIT"}
              </Button>
            </form>
            <div className="flex justify-center mt-6 gap-4">
              <Link href="#" className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center">
                <Facebook className="h-4 w-4" />
              </Link>
              <Link href="#" className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center">
                <Twitter className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-400 py-4 text-white-100 text-xs">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="#" className="hover:text-white">
              Careers
            </Link>
            <span>|</span>
            <Link href="#" className="hover:text-white">
              Terms of Use
            </Link>
            <span>|</span>
            <Link href="#" className="hover:text-white">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link href="#" className="hover:text-white">
              Cookie notice
            </Link>
          </div>
          <div className="text-center mt-2">© 2024 All Rights Reserved.</div>
        </div>
      </footer>
    </div>
  )
}

