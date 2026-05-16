import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Globe, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center hero-gradient">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-5xl font-serif font-bold text-white mb-6">
            Our <span className="text-gold">Story</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            A journey of passion, craftsmanship, and timeless elegance
          </p>
        </motion.div>
      </section>



      {/* About Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-serif font-bold text-gray-900 mb-8">
              Crafting <span className="text-gold">Excellence</span> Since 2018
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              VRINDA Boutique was founded with a simple vision: to bring together the world's most exquisite 
              pieces in one curated collection. Over three decades later, we remain committed to this vision, 
              sourcing only the finest materials and working with artisans who share our passion for perfection.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our name represents more than just luxury – it embodies a philosophy of timeless style, 
              exceptional quality, and the belief that true elegance never goes out of fashion.
            </p>
          </motion.div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            {[
              {
                icon: <Award className="h-8 w-8" />,
                title: "Uncompromising Quality",
                description: "Every piece in our collection undergoes rigorous quality checks to ensure it meets our exacting standards."
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Artisan Craftsmanship",
                description: "We partner with skilled artisans from around the world who bring generations of expertise to their work."
              },
              {
                icon: <Globe className="h-8 w-8" />,
                title: "Global Sourcing",
                description: "Our team travels the world to discover unique pieces and emerging designers who share our vision."
              },
              {
                icon: <Heart className="h-8 w-8" />,
                title: "Passionate Service",
                description: "Our knowledgeable team is dedicated to helping you find pieces that resonate with your personal style."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-gold mb-4 flex justify-center">{value.icon}</div>
                <h3 className="text-2xl font-serif font-semibold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>



                    {/* Team Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-serif font-bold text-gray-900 text-center mb-12">
              Meet Our <span className="text-gold">Team</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center max-w-3xl mx-auto">
              {[
                {
                  name: "Kusum Lata",
                  role: "Founder",
                    bio: "With over 8 years in Cloth stitching and designing, Kusum's vision shapes our curated collections."
                  },
                  {
                    name: "Himesh Yadav",
                    role: "Head of Operations",
                    bio: "Himesh ensures seamless operations and exceptional customer experiences."
                  },
                  
                ].map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    {member.name === "Kusum Lata" ? (
    <img
      src="/kusum.jpg"
      alt="Kusum Lata"
      className="w-52 h-52 rounded-full mx-auto mb-6 object-cover border-4 border-gold shadow-lg"
    />
  ) : member.name === "Himesh Yadav" ? (
    <img
      src="/himesh.jpg"
      alt="Himesh Yadav"
      className="w-52 h-52 rounded-full mx-auto mb-6 object-cover border-4 border-gold shadow-lg"
    />
  ) : (
    <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
  )}
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-gold text-xl font-semibold mb-4">{member.role}</p>
                    <p className="text-gray-600 font-semibold text-sm mb-5">{member.bio}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>


          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-3xl font-serif font-bold text-gray-900 text-center mb-12">
              Our <span className="text-gold">Journey</span>
            </h2>
            <div className="space-y-8">
              {[
                { year: "2018", event: "VRINDA Boutique was started with a very few customers and designs" },
                { year: "2020", event: "Expanded to include emerging designs and opened our store at home" },
                { year: "2022", event: "Introduced our exclusive in-house collection of timeless pieces" },
                { year: "2024", event: "Continuing our legacy of excellence while embracing sustainable luxury" },
                { year: "2025", event: "Launched our online platform, bringing luxury to a global audience" }

              ].map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-4"
                >
                  <div className="flex-shrink-0">
                    <span className="text-2xl font-bold text-gold">{milestone.year}</span>
                  </div>
                  <div className="h-px bg-gray-300 flex-1"></div>
                  <div className="flex-shrink-0 text-right max-w-xs">
                    <p className="text-gray-700">{milestone.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>


        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
              Experience the VRINDA <span className="text-gold">Difference</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of discerning clients who trust us for their luxury fashion needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/products"
                className="btn-primary inline-flex items-center justify-center"
              >
                Explore Collection
              </a>
              <a
                href="/contact"
                className="btn-secondary inline-flex items-center justify-center"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
